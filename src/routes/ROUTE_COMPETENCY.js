/* eslint-disable default-case */
const { getCompetencyList } = require('../controllers/competency.controller');

exports.getRouteCompetencyId = async (route) => {
  const competencyList = await getCompetencyList();
  switch (route) {
    case 'vehicle':
      return competencyList.ARAC_GIRIS_CIKIS_ISLEMLERI;
    case 'parkinglot':
      return competencyList.OTOPARK_ISLEMLERI;
    case 'vehicletype':
      return competencyList.ARAC_TIPI_ISLEMLERI;
    case 'enforcementoffice':
      return competencyList.ICRA_KURUMU_TURLERI_ISLEMLERI;
    case 'additionalfee':
      return competencyList.EK_UCRET_ISLEMLERI;
    case 'discount':
      return competencyList.INDIRIM_ISLEMLERI;
    case 'user':
      return competencyList.PERSONEL_ISLEMLERI;
    case 'role':
      return competencyList.PROFIL_ISLEMLERI;
    case 'towfirm':
      return competencyList.CEKICI_FIRMA_ISLEMLERI;
    case 'transfer':
      return competencyList.TRANSFER_ISLEMLERI;
    case 'announcement':
      return competencyList.DUYURU_YONETIMI;
    case 'annualleave':
      return competencyList.YILLIK_IZIN_ISLEMLERI;
  }
};
