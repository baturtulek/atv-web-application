
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
  }
};
