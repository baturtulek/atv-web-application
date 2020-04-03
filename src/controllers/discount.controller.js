const i18n = require('../services/i18n');
const routeNames = require('../locales/routeNamesTR.json');
const { DB } = require('../services/sequelize');

exports.listDiscounts = async (req, res) => {
  const discountList = await DB.Discount.findAll({
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
    await DB.Discount.create({
      name: discount.name,
      parkDiscount: discount.parkDiscount,
      transferDiscount: discount.transferDiscount,
    });
    req.session.flashMessages = {
      message: i18n.__('ADDED', routeNames.DISCOUNT),
      type: 'success',
    };
    return res.redirect('/discount/add');
  } catch (error) {
    req.session.flashMessages = {
      message: i18n.__('ADD_ERROR', routeNames.DISCOUNT),
      type: 'danger',
    };
    return res.redirect('/discount/add');
  }
};

exports.updateDiscountView = async (req, res) => {
  const { id } = req.params;
  try {
    const discount = await DB.Discount.findOne({
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
    await DB.Discount.update(
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
      message: i18n.__('UPDATED', routeNames.DISCOUNT),
      type: 'success',
    };
    return res.redirect(`/discount/update/${discount.id}`);
  } catch (error) {
    req.session.flashMessages = {
      message: i18n.__('UPDATE_ERROR', routeNames.DISCOUNT),
      type: 'danger',
    };
    return res.redirect(`/discount/update/${discount.id}`);
  }
};

exports.deleteDiscount = async (req, res) => {
  const { id } = req.params;
  try {
    const discount = await DB.Discount.findOne({
      where: { id },
    });
    if (!discount) {
      return res.redirect('/discount/list');
    }
    await DB.Discount.destroy({
      where: { id },
    });
    req.session.flashMessages = {
      message: i18n.__('DELETED', routeNames.DISCOUNT),
      type: 'success',
    };
    return res.redirect('/discount/list');
  } catch (error) {
    req.session.flashMessages = {
      mmessage: i18n.__('DELETE_ERROR', routeNames.DISCOUNT),
      type: 'danger',
    };
    return res.redirect('/discount/list');
  }
};
