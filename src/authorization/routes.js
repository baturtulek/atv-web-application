const { Competencies } = require('./competencies');

exports.Routes = {
  vehicle: Competencies.ARAC_GIRIS_CIKIS_ISLEMLERI,
  parkinglot: Competencies.OTOPARK_ISLEMLERI,
  vehicletype: Competencies.ARAC_TIPI_ISLEMLERI,
  enforcementoffice: Competencies.ICRA_KURUMU_TURLERI_ISLEMLERI,
  discount: Competencies.INDIRIM_ISLEMLERI,
  user: Competencies.PERSONEL_ISLEMLERI,
  role: Competencies.PROFIL_ISLEMLERI,
};
