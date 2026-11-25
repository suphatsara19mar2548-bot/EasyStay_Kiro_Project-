const roomSelect = document.getElementById('room');
const checkin = document.getElementById('checkin');
const checkout = document.getElementById('checkout');
const total = document.getElementById('total');
const nightsText = document.getElementById('nights');
const form = document.getElementById('bookingForm');
const confirmation = document.getElementById('confirmation');

function getNights() {
  if (!checkin.value || !checkout.value) return 0;
  const start = new Date(checkin.value + 'T00:00:00');
  const end = new Date(checkout.value + 'T00:00:00');
  return Math.round((end - start) / 86400000);
}
function updateTotal() {
  const nights = getNights();
  const price = Number(roomSelect.selectedOptions[0]?.dataset.price || 0);
  const amount = nights > 0 ? nights * price : 0;
  total.textContent = '฿' + amount.toLocaleString('th-TH');
  nightsText.textContent = nights > 0 ? `${nights} คืน × ฿${price.toLocaleString('th-TH')} ต่อคืน` : 'กรุณาเลือกห้องพักและวันที่เข้าพัก';
}
document.querySelectorAll('.choose-room').forEach(button => {
  button.addEventListener('click', () => {
    roomSelect.value = button.dataset.room;
    updateTotal();
    document.getElementById('booking').scrollIntoView({behavior:'smooth'});
  });
});
[roomSelect, checkin, checkout].forEach(el => el.addEventListener('change', updateTotal));
checkin.addEventListener('change', () => {
  checkout.min = checkin.value;
  if (checkout.value && checkout.value <= checkin.value) checkout.value = '';
  updateTotal();
});
form.addEventListener('submit', event => {
  event.preventDefault();
  const nights = getNights();
  if (nights <= 0) {
    alert('กรุณาเลือกวันเช็กเอาต์ให้หลังวันเช็กอินอย่างน้อย 1 วัน');
    return;
  }
  const price = Number(roomSelect.selectedOptions[0].dataset.price);
  const amount = nights * price;
  const name = document.getElementById('guestName').value.trim();
  const phone = document.getElementById('phone').value.trim();
  confirmation.hidden = false;
  confirmation.innerHTML = `<h3>ส่งคำขอจองเรียบร้อยแล้ว (ตัวอย่าง)</h3>
    คุณ ${name}<br>เบอร์โทรศัพท์: ${phone}<br>ห้องพัก: ${roomSelect.value}<br>
    วันที่เข้าพัก: ${checkin.value} ถึง ${checkout.value}<br>
    จำนวน ${nights} คืน — ราคารวม ฿${amount.toLocaleString('th-TH')}<br>
    <small>หมายเหตุ: ข้อมูลนี้แสดงในหน้าเว็บเท่านั้น ยังไม่ได้บันทึกลงฐานข้อมูล</small>`;
  confirmation.scrollIntoView({behavior:'smooth',block:'center'});
});
