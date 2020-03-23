
const { db } = require('../models/DB');
const { RESPONSE_MESSAGE } = require('../messages');

const ROUTE_NAME = 'İndirim';

exports.listDiscounts = async (req, res) => {
  const discountList = await db.Discount.findAll({
    raw: true,
  });
  return res.render('layouts/main', {
    partialName: 'listDiscounts',
    discountList,
  });
};

exports.addDiscountView = async (req, res) => {
  return res.render('layouts/main', {
    partialName: 'addDiscount',
    endPoint: 'add',
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
    req.session.flashMessages = {
      message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.ADDED}`,
      type: 'success',
    };
    return res.redirect('/discount/add');
  } catch (error) {
    req.session.flashMessages = {
      message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.ADD_ERROR}`,
      type: 'danger',
    };
    return res.redirect('/discount/add');
  }
};

exports.updateDiscountView = async (req, res) => {
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
    req.session.flashMessages = {
      message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.UPDATED}`,
      type: 'success',
    };
    return res.redirect(`/discount/update/${discount.id}`);
  } catch (error) {
    req.session.flashMessages = {
      message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.UPDATE_ERROR}`,
      type: 'danger',
    };
    return res.redirect(`/discount/update/${discount.id}`);
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
    req.session.flashMessages = {
      message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.DELETED}`,
      type: 'success',
    };
    return res.redirect('/discount/list');
  } catch (error) {
    req.session.flashMessages = {
      message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.DELETE_ERROR}`,
      type: 'danger',
    };
    return res.redirect('/discount/list');
  }
};
