
const db = require('../config/db');
const { getMessageFromURL, URL_MESSAGE } = require('../messages');

const ROUTE_NAME = 'İndirim';

exports.listDiscounts = async (req, res) => {
  const { errorMessage, successMessage } = getMessageFromURL(ROUTE_NAME, req.query);
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
  const { errorMessage, successMessage } = getMessageFromURL(ROUTE_NAME, req.query);
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
    return res.redirect(`/discount/add?${URL_MESSAGE.success.add}`);
  } catch (error) {
    return res.redirect(`/discount/add?${URL_MESSAGE.error.add}`);
  }
};

exports.updateDiscountView = async (req, res) => {
  const { errorMessage, successMessage } = getMessageFromURL(ROUTE_NAME, req.query);
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
    return res.redirect(`/discount/update/${discount.id}?${URL_MESSAGE.success.update}`);
  } catch (error) {
    return res.redirect(`/discount/update/${discount.id}?${URL_MESSAGE.error.update}`);
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
    return res.redirect(`/discount/list?${URL_MESSAGE.success.delete}`);
  } catch (error) {
    return res.redirect(`/discount/list?${URL_MESSAGE.error.delete}`);
  }
};
