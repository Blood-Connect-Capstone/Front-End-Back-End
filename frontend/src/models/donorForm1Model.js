import axios from "axios";

export async function form1Data(formData) {
  const formDataObj = {
    user_id: formData.user_id,
    weight: formData.weight,
    height: formData.height,
    total_donor: formData.total_donor,
    last_donor_date: formData.last_donor_date,
    last_donor_place: formData.last_donor_place,
    donor_card_number: formData.donor_card_number,
    status: 'on-screening',
    screening_status: 'tahap_1',
  };

  if (formData.reservation_type == 'request') {
    formDataObj.blood_request_id = formData.reservation_refer_id;
  } else {
    formDataObj.donor_location_id = formData.reservation_refer_id;
  }

  const response = await axios.post(import.meta.env.VITE_API_URL + '/donor-reservations', formDataObj);
  return response.data;
}