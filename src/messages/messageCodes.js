
exports.messageEnum = {
  success: {
    add: 'success=added',
    update: 'success=updated',
    delete: 'success=deleted',
  },
  error: {
    add: 'error=add_error',
    update: 'error=update_error',
    delete: 'error=delete_error',
    inuse: 'error=in_use',
    new_passwords_not_matches: 'error=new_passwords_not_matches',
    old_password_invalid: 'error=old_password_invalid',
  },
};

exports.getMessage = (ROUTE_NAME, query) => {
  return {
    successMessage: getSuccessMessage(ROUTE_NAME, query.success),
    errorMessage: getErorMessage(ROUTE_NAME, query.error),
  };
};

const getSuccessMessage = (ROUTE_NAME, query) => {
  // eslint-disable-next-line default-case
  switch (query) {
    case 'added':
      return `${ROUTE_NAME} başarıyla eklendi.`;
    case 'updated':
      return `${ROUTE_NAME} başarıyla güncellendi.`;
    case 'deleted':
      return `${ROUTE_NAME} başarıyla silindi.`;
  }
};

const getErorMessage = (ROUTE_NAME, query) => {
  // eslint-disable-next-line default-case
  switch (query) {
    case 'add_error':
      return `${ROUTE_NAME} eklenirken hata oluştu.`;
    case 'updated_error':
      return `${ROUTE_NAME} güncellenirken hata oluştu.`;
    case 'delete_error':
      return `${ROUTE_NAME} silinirken hata oluştu.`;
    case 'in_use':
      return `${ROUTE_NAME} sistemde zaten kayıtlı.`;
    case 'old_password_invalid':
      return 'Eski şifreniz hatalı.';
    case 'new_passwords_not_matches':
      return 'Girdiğiniz yeni şifreler uyuşmuyor.';
  }
};
