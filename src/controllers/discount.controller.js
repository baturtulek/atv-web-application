
const db = require('../config/db');
const { getMessage } = require('../messages/messageCodes');

const ROUTE_NAME = 'İndirim';

exports.listDiscounts = async (req, res) => {
  const { errorMessage, successMessage } = getMessage(ROUTE_NAME, req.query);
  const discountList = await db.Discount.findAll({
    raw: true,
  });
  return res.render('layouts/main', {
    partialName: 'listDiscounts',
    discountList,
    success: successMessage,
    error: errorMessage,
  });
};

exports.addDiscountView = async (req, res) => {
  const { errorMessage, successMessage } = getMessage(ROUTE_NAME, req.query);
  return res.render('layouts/main', {
    partialName: 'addDiscount',
    endPoint: 'add',
    success: successMessage,
    error: errorMessage,
  });
};

exports.addDiscount = async (req, res) => {
  const discount = req.body;
  try {
    await db.Discount.create({
      name: discount.name,
      parkDiscount: discount.parkDiscount,
      transferDiscount: discount.transferDiscount,
    });
    return res.redirect('/discount/add?success=added');
  } catch (error) {
    return res.redirect('/discount/add?error=add_error');
  }
};

exports.updateDiscountView = async (req, res) => {
  const { errorMessage, successMessage } = getMessage(ROUTE_NAME, req.query);
  const { id } = req.params;
  try {
    const discount = await db.Discount.findOne({
      where: { id },
      raw: true,
    });
    if (!discount) {
      return res.redirect('/discount/list');
    }
    return res.render('layouts/main', {
      partialName: 'addDiscount',
      endPoint: 'update',
      discount,
      error: errorMessage,
      success: successMessage,
    });
  } catch (error) {
    return res.redirect('/discount/list');
  }
};

exports.updateDiscount = async (req, res) => {
  const discount = req.body;
  try {
    await db.Discount.update(
      {
        name: discount.name,
        parkDiscount: discount.parkDiscount,
        transferDiscount: discount.transferDiscount,
      },
      {
        where: {
          id: discount.id,
        },
        raw: true,
      },
    );
    return res.redirect(`/discount/update/${discount.id}?success=updated`);
  } catch (error) {
    return res.redirect(`/discount/update/${discount.id}?error=update_error`);
  }
};

exports.deleteDiscount = async (req, res) => {
  const { id } = req.params;
  try {
    const discount = await db.Discount.findOne({
      where: { id },
    });
    if (!discount) {
      return res.redirect('/discount/list');
    }
    await db.Discount.destroy({
      where: { id },
    });
    return res.redirect('/discount/list?success=deleted');
  } catch (error) {
    return res.redirect('/discount/list?error=delete_error');
  }
};
