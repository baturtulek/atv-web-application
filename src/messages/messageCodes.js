const MESSAGES = {
  user_added: 'Kullanıcı başarıyla eklendi.',
  user_add_error: 'Kullınıcı eklerken hata oluştu.',
  user_updated: 'Kullanıcı başarıyla güncellendi.',
  user_update_error: 'Kullanıcı güncellenirken hata oluştu.',
  user_deleted: 'Kullanıcı başarıyla silindi.',
  user_delete_error: 'Kullınıcı silinirken hata oluştu.',
  username_in_use: 'Kullanıcı adı sistemde zaten kayıtlı. Başka bir kullanıcı adı seçin.',
  parkinglot_added: 'Otopark başarıyla eklendi.',
  parkinglot_add_error: 'Otopark eklenirken hata oluştu.',
  parkinglot_updated: 'Otopark başarıyla güncellendi.',
  parkinglot_update_error: 'Otopark güncellenirken hata oluştu.',
  parkinglot_deleted: 'Otopark başarıyla silindi.',
  parkinglot_delete_error: 'Otopark silinirken hata oluştu.',
};

exports.getMessage = (query) => {
  return {
    errorMessage: MESSAGES[query.error],
    successMessage: MESSAGES[query.success],
  };
};
