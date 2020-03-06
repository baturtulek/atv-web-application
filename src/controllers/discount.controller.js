
const db = require('../config/db');
const { getMessage } = require('../messages/messageCodes');

exports.listDiscounts = async (req, res) => {
  const { errorMessage, successMessage } = getMessage(req.query);
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
  const { errorMessage, successMessage } = getMessage(req.query);
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
    return res.redirect('/discount/add?success=discount_added');
  } catch (error) {
    return res.redirect('/discount/add?error=discount_add_error');
  }
};

exports.updateDiscountView = async (req, res) => {
  const { errorMessage, successMessage } = getMessage(req.query);
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
    return res.redirect(`/discount/update/${discount.id}?success=discount_updated`);
  } catch (error) {
    return res.redirect(`/discount/update/${discount.id}?error=discount_update_error`);
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
    return res.redirect('/discount/list?success=discount_deleted');
  } catch (error) {
    return res.redirect('/discount/list?error=discount_delete_error');
  }
};
