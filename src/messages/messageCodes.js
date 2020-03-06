const MESSAGES = {
  user_added: 'Kullanıcı başarıyla eklendi.',
  user_add_error: 'Kullanıcı eklerken hata oluştu.',
  user_updated: 'Kullanıcı başarıyla güncellendi.',
  user_update_error: 'Kullanıcı güncellenirken hata oluştu.',
  user_deleted: 'Kullanıcı başarıyla silindi.',
  user_delete_error: 'Kullanıcı silinirken hata oluştu.',
  username_in_use: 'Kullanıcı adı sistemde zaten kayıtlı. Başka bir kullanıcı adı seçin.',
  parkinglot_added: 'Otopark başarıyla eklendi.',
  parkinglot_add_error: 'Otopark eklenirken hata oluştu.',
  parkinglot_updated: 'Otopark başarıyla güncellendi.',
  parkinglot_update_error: 'Otopark güncellenirken hata oluştu.',
  parkinglot_deleted: 'Otopark başarıyla silindi.',
  parkinglot_delete_error: 'Otopark silinirken hata oluştu.',
  enforcementOffice_added: 'İcra kurumu başarıyla eklendi.',
  enforcementOffice_add_error: 'İcra kurumu eklerken hata oluştu.',
  enforcementOffice_updated: 'İcra kurumu başarıyla güncellendi.',
  enforcementOffice_update_error: 'İcra kurumu güncellenirken hata oluştu.',
  enforcementOffice_deleted: 'İcra kurumu başarıyla silindi.',
  enforcementOffice_delete_error: 'İcra kurumu silinirken hata oluştu.',

  discount_added: 'İndirim başarıyla eklendi.',
  discount_add_error: 'İndirim eklerken hata oluştu.',
  discount_updated: 'İndirim başarıyla güncellendi.',
  discount_update_error: 'İndirim güncellenirken hata oluştu.',
  discount_deleted: 'İndirim başarıyla silindi.',
  discount_delete_error: 'İndirim silinirken hata oluştu.',

  // Vehicle types messages
  vehicletype_added: 'Araç tipi başarıyla eklendi.',
  vehicletype_add_error: 'Araç tipi eklenirken hata oluştu',
  vehicletype_updated: 'Araç tipi başarıyla güncellendi',
  vehicletype_update_error: 'Araç tipi güncellenirken hata oluştu.',
  vehicletype_deleted: 'Araç tipi başarıyla silindi',
  vehicletype_delete_error: 'Araç tipi silinirken hata oluştu.',
};

exports.getMessage = (query) => {
  return {
    errorMessage: MESSAGES[query.error],
    successMessage: MESSAGES[query.success],
  };
};
