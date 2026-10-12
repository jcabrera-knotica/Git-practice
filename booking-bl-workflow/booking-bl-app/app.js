const STORAGE_KEY = 'booking-bl-workflow-demo';

const defaultBookings = [
  {
    id: 1,
    bookingNumber: 'BK-1001',
    shipper: 'Acme Exports',
    consignee: 'Northline Imports',
    origin: 'Shanghai',
    destination: 'Singapore',
    route: 'Shanghai → Singapore',
    vessel: 'MV Ocean Star',
    rate: '2500.00',
    freightRate: '2500.00',
    localChargesRate: '150.00',
    otherChargesRate: '75.00',
    customerBillingTotal: '2725.00',
    cargo: 'Electronics',
    container: '40HC',
    etd: '2026-10-15',
    eta: '2026-10-22',
    source: 'customer@acme.com / booking.pdf',
    status: 'Confirmed',
    blNumber: 'BL-8801',
    blStatus: 'Issued',
    blType: 'Original'
  },
  {
    id: 2,
    bookingNumber: 'BK-1002',
    shipper: 'BluePeak Trading',
    consignee: 'Harbor Goods',
    origin: 'Busan',
    destination: 'Jakarta',
    route: 'Busan → Jakarta',
    vessel: '',
    rate: '',
    freightRate: '',
    localChargesRate: '',
    otherChargesRate: '',
    customerBillingTotal: '',
    cargo: 'Machinery',
    container: '20GP',
    etd: '2026-10-20',
    eta: '2026-10-27',
    source: 'ops@bluepeak.com / shipment-quote.pdf',
    status: 'Pending Manual Review',
    blNumber: '-',
    blStatus: 'Not issued',
    blType: ''
  }
];

function normalizeBookings(list) {
  return (list || []).map((booking) => {
    const derivedRoute = [booking.origin || '', booking.destination || '']
      .filter(Boolean)
      .join(' → ');

    return {
      ...booking,
      route: booking.route || derivedRoute,
      vessel: booking.vessel || '',
      rate: booking.rate || booking.freightRate || '',
      freightRate: booking.freightRate || booking.rate || '',
      localChargesRate: booking.localChargesRate || '',
      otherChargesRate: booking.otherChargesRate || '',
      customerBillingTotal: booking.customerBillingTotal || ''
    };
  });
}

const storedBookings = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
let bookings = normalizeBookings(storedBookings && storedBookings.length ? storedBookings : defaultBookings);

const form = document.getElementById('bookingForm');
const editModal = document.getElementById('editBookingModal');
const issueBlModal = document.getElementById('issueBlModal');
const blPrintoutModal = document.getElementById('blPrintoutModal');
const editForm = document.getElementById('editBookingForm');
const issueBlForm = document.getElementById('issueBlForm');
const editBookingIdInput = document.getElementById('editBookingId');
const issueBlBookingIdInput = document.getElementById('issueBlBookingId');
const closeEditModalButton = document.getElementById('closeEditModal');
const closeIssueBlModalButton = document.getElementById('closeIssueBlModal');
const closeBlPrintoutButton = document.getElementById('closeBlPrintoutModal');
const listEl = document.getElementById('bookingList');
const statsEl = document.getElementById('stats');
const statusFlowEl = document.getElementById('statusFlow');
const blPrintoutContent = document.getElementById('blPrintoutContent');

function saveBookings() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

function hasMandatoryBookingFields(booking) {
  const routeValue = (booking.route || '').trim();
  const vesselValue = (booking.vessel || '').trim();
  const rateValue = Number(booking.rate || booking.freightRate || 0);

  return Boolean(routeValue) && Boolean(vesselValue) && !Number.isNaN(rateValue) && rateValue > 0;
}

function calculateCustomerBillingTotal(formData) {
  const freight = Number(formData.get('freightRate') || 0);
  const localCharges = Number(formData.get('localChargesRate') || 0);
  const otherCharges = Number(formData.get('otherChargesRate') || 0);
  const total = freight + localCharges + otherCharges;

  return Number.isFinite(total) ? total.toFixed(2) : '0.00';
}

function getBookingValues(formData) {
  const route = formData.get('route')?.toString().trim() || `${formData.get('origin')} → ${formData.get('destination')}`;
  const rate = formData.get('rate')?.toString().trim() || formData.get('freightRate')?.toString().trim() || '';
  const freightRate = formData.get('freightRate')?.toString().trim() || rate;
  const localChargesRate = formData.get('localChargesRate')?.toString().trim() || '';
  const otherChargesRate = formData.get('otherChargesRate')?.toString().trim() || '';

  return {
    shipper: formData.get('shipper')?.toString().trim(),
    consignee: formData.get('consignee')?.toString().trim(),
    origin: formData.get('origin')?.toString().trim(),
    destination: formData.get('destination')?.toString().trim(),
    route,
    vessel: formData.get('vessel')?.toString().trim(),
    rate,
    freightRate,
    localChargesRate,
    otherChargesRate,
    customerBillingTotal: calculateCustomerBillingTotal(formData),
    cargo: formData.get('cargo')?.toString().trim(),
    container: formData.get('container')?.toString().trim(),
    etd: formData.get('etd')?.toString().trim(),
    eta: formData.get('eta')?.toString().trim(),
    source: formData.get('source')?.toString().trim()
  };
}

function populateForm(booking) {
  const formValues = new FormData(form);
  formValues.set('shipper', booking.shipper || '');
  formValues.set('consignee', booking.consignee || '');
  formValues.set('origin', booking.origin || '');
  formValues.set('destination', booking.destination || '');
  formValues.set('route', booking.route || '');
  formValues.set('vessel', booking.vessel || '');
  formValues.set('rate', booking.rate || '');
  formValues.set('cargo', booking.cargo || '');
  formValues.set('container', booking.container || '');
  formValues.set('source', booking.source || '');
  formValues.set('etd', booking.etd || '');
  formValues.set('eta', booking.eta || '');

  form.querySelector('[name="shipper"]').value = booking.shipper || '';
  form.querySelector('[name="consignee"]').value = booking.consignee || '';
  form.querySelector('[name="origin"]').value = booking.origin || '';
  form.querySelector('[name="destination"]').value = booking.destination || '';
  form.querySelector('[name="route"]').value = booking.route || '';
  form.querySelector('[name="vessel"]').value = booking.vessel || '';
  form.querySelector('[name="rate"]').value = booking.rate || '';
  form.querySelector('[name="cargo"]').value = booking.cargo || '';
  form.querySelector('[name="container"]').value = booking.container || '';
  form.querySelector('[name="source"]').value = booking.source || '';
  form.querySelector('[name="etd"]').value = booking.etd || '';
  form.querySelector('[name="eta"]').value = booking.eta || '';
}

function updateCustomerBillingTotal() {
  const totalField = editForm.querySelector('[name="customerBillingTotal"]');
  totalField.value = calculateCustomerBillingTotal(new FormData(editForm));
}

function populateEditModal(booking) {
  editBookingIdInput.value = String(booking.id || '');
  editForm.querySelector('[name="shipper"]').value = booking.shipper || '';
  editForm.querySelector('[name="consignee"]').value = booking.consignee || '';
  editForm.querySelector('[name="origin"]').value = booking.origin || '';
  editForm.querySelector('[name="destination"]').value = booking.destination || '';
  editForm.querySelector('[name="route"]').value = booking.route || '';
  editForm.querySelector('[name="vessel"]').value = booking.vessel || '';
  editForm.querySelector('[name="rate"]').value = booking.rate || booking.freightRate || '';
  editForm.querySelector('[name="freightRate"]').value = booking.freightRate || booking.rate || '';
  editForm.querySelector('[name="localChargesRate"]').value = booking.localChargesRate || '';
  editForm.querySelector('[name="otherChargesRate"]').value = booking.otherChargesRate || '';
  editForm.querySelector('[name="cargo"]').value = booking.cargo || '';
  editForm.querySelector('[name="container"]').value = booking.container || '';
  editForm.querySelector('[name="source"]').value = booking.source || '';
  editForm.querySelector('[name="etd"]').value = booking.etd || '';
  editForm.querySelector('[name="eta"]').value = booking.eta || '';
  updateCustomerBillingTotal();
}

function openEditModal(booking) {
  populateEditModal(booking);
  editModal.classList.remove('hidden');
  editModal.setAttribute('aria-hidden', 'false');
}

function closeEditModal() {
  editModal.classList.add('hidden');
  editModal.setAttribute('aria-hidden', 'true');
  editForm.reset();
}

function openIssueBlModal(booking) {
  issueBlBookingIdInput.value = String(booking.id || '');
  issueBlForm.querySelector('[name="bookingNumber"]').value = booking.bookingNumber || '';
  issueBlForm.querySelector('[name="blNumber"]').value = booking.blNumber && booking.blNumber !== '-' ? booking.blNumber : `BL-${String(Date.now()).slice(-5)}`;
  issueBlForm.querySelector('[name="blType"]').value = booking.blType || 'Original';
  issueBlModal.classList.remove('hidden');
  issueBlModal.setAttribute('aria-hidden', 'false');
}

function closeIssueBlModal() {
  issueBlModal.classList.add('hidden');
  issueBlModal.setAttribute('aria-hidden', 'true');
  issueBlForm.reset();
}

function openBlPrintout(booking) {
  const customerBill = booking.customerBillingTotal ? '$' + Number(booking.customerBillingTotal).toFixed(2) : 'Not set';
  const blType = booking.blType || 'Original';

  blPrintoutContent.innerHTML = `
    <div class="bl-document">
      <div class="bl-header-row">
        <div>
          <p class="bl-label">Bill of Lading</p>
          <h3>${booking.bookingNumber}</h3>
        </div>
        <div class="bl-doc-meta">
          <div><strong>BL No:</strong> ${booking.blNumber || 'Not issued'}</div>
          <div><strong>BL Type:</strong> ${blType}</div>
          <div><strong>Status:</strong> ${booking.blStatus || 'Issued'}</div>
        </div>
      </div>

      <div class="bl-grid">
        <div class="bl-card">
          <h4>Shipper</h4>
          <p>${booking.shipper || 'Not set'}</p>
        </div>
        <div class="bl-card">
          <h4>Consignee</h4>
          <p>${booking.consignee || 'Not set'}</p>
        </div>
        <div class="bl-card">
          <h4>Route</h4>
          <p>${booking.route || `${booking.origin || ''} → ${booking.destination || ''}`}</p>
        </div>
        <div class="bl-card">
          <h4>Vessel</h4>
          <p>${booking.vessel || 'Not set'}</p>
        </div>
        <div class="bl-card">
          <h4>Cargo</h4>
          <p>${booking.cargo || 'Not set'}</p>
        </div>
        <div class="bl-card">
          <h4>Container</h4>
          <p>${booking.container || 'Not set'}</p>
        </div>
      </div>

      <div class="bl-grid bl-grid-two">
        <div class="bl-card">
          <h4>Dates</h4>
          <p>ETD: ${booking.etd || 'Not set'}<br>ETA: ${booking.eta || 'Not set'}</p>
        </div>
        <div class="bl-card">
          <h4>Customer Billing</h4>
          <p>
            Freight: ${booking.freightRate ? '$' + Number(booking.freightRate).toFixed(2) : 'Not set'}<br>
            Local Charges: ${booking.localChargesRate ? '$' + Number(booking.localChargesRate).toFixed(2) : 'Not set'}<br>
            Other Charges: ${booking.otherChargesRate ? '$' + Number(booking.otherChargesRate).toFixed(2) : 'Not set'}<br>
            Total: ${customerBill}
          </p>
        </div>
      </div>

      <div class="bl-footer">
        <p><strong>Declaration:</strong> This Bill of Lading has been issued in accordance with the confirmed booking and may be transmitted by print, email, or EDI.</p>
      </div>
    </div>
  `;

  blPrintoutModal.classList.remove('hidden');
  blPrintoutModal.setAttribute('aria-hidden', 'false');
}

function closeBlPrintout() {
  blPrintoutModal.classList.add('hidden');
  blPrintoutModal.setAttribute('aria-hidden', 'true');
}

function renderStats() {
  const total = bookings.length;
  const pendingReview = bookings.filter((b) => b.status === 'Pending Manual Review').length;
  const confirmed = bookings.filter((b) => b.status === 'Confirmed').length;
  const blIssued = bookings.filter((b) => b.status === 'BL Issued').length;

  statsEl.innerHTML = `
    <div class="stat-box">
      <span>Total Bookings</span>
      <strong>${total}</strong>
    </div>
    <div class="stat-box">
      <span>Pending Review</span>
      <strong>${pendingReview}</strong>
    </div>
    <div class="stat-box">
      <span>Confirmed</span>
      <strong>${confirmed}</strong>
    </div>
    <div class="stat-box">
      <span>BL Issued</span>
      <strong>${blIssued}</strong>
    </div>
  `;

  if (statusFlowEl) {
    statusFlowEl.innerHTML = `
      <div class="status-flow-label">Status Flow</div>
      <div class="status-flow-track">
        <span>Pending Manual Review</span>
        <span class="status-arrow">→</span>
        <span>Confirmed</span>
        <span class="status-arrow">→</span>
        <span>BL Issued</span>
        <span class="status-arrow">→</span>
        <span>Released</span>
      </div>
    `;
  }
}

function updateBookingStatus(id, nextStatus) {
  bookings = bookings.map((booking) => {
    if (booking.id === id) {
      return { ...booking, status: nextStatus };
    }
    return booking;
  });

  saveBookings();
  render();
}

function createBookingFromForm(event) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const values = getBookingValues(formData);
  const editingId = Number(form.dataset.editingId || 0);

  if (editingId) {
    bookings = bookings.map((booking) => {
      if (booking.id === editingId) {
        return {
          ...booking,
          ...values,
          route: values.route || `${values.origin || ''} → ${values.destination || ''}`,
          vessel: values.vessel || booking.vessel || '',
          rate: values.rate || booking.rate || '',
          freightRate: values.freightRate || booking.freightRate || '',
          localChargesRate: values.localChargesRate || booking.localChargesRate || '',
          otherChargesRate: values.otherChargesRate || booking.otherChargesRate || '',
          customerBillingTotal: values.customerBillingTotal || booking.customerBillingTotal || '',
          status: booking.status === 'Confirmed' ? 'Confirmed' : booking.status
        };
      }
      return booking;
    });

    form.dataset.editingId = '';
    form.querySelector('button[type="submit"]').textContent = 'Create Booking';
  } else {
    const autoGeneratedNumber = `BK-${String(Date.now()).slice(-6)}`;

    const booking = {
      id: Date.now(),
      bookingNumber: autoGeneratedNumber,
      ...values,
      route: values.route || `${values.origin || ''} → ${values.destination || ''}`,
      status: 'Pending Manual Review',
      blNumber: '-',
      blStatus: 'Not issued',
      autoReplySent: false,
      confirmationSent: false
    };

    bookings.unshift(booking);
  }

  saveBookings();
  event.currentTarget.reset();
  render();
}

function renderBookings() {
  listEl.innerHTML = '';

  bookings.forEach((booking) => {
    const card = document.createElement('article');
    card.className = 'booking-card';
    const canConfirm = hasMandatoryBookingFields(booking);
    const hasIssuedBl = booking.blStatus === 'Issued' || (booking.blNumber && booking.blNumber !== '-');
    const routeValue = booking.route || `${booking.origin || ''} → ${booking.destination || ''}`;

    card.innerHTML = `
      <div class="booking-header">
        <strong>${booking.bookingNumber}</strong>
        <span class="status-pill" data-status="${booking.status}">${booking.status}</span>
      </div>

      <div class="booking-meta">
        <div><strong>Booking No:</strong> ${booking.bookingNumber}</div>
        <div><strong>Shipper:</strong> ${booking.shipper}</div>
        <div><strong>Consignee:</strong> ${booking.consignee}</div>
        <div><strong>Route:</strong> ${routeValue}</div>
        <div><strong>Vessel:</strong> ${booking.vessel || 'Not set'}</div>
        <div><strong>Rate:</strong> ${booking.rate ? '$' + Number(booking.rate).toFixed(2) : 'Not set'}</div>
        <div><strong>Freight:</strong> ${booking.freightRate ? '$' + Number(booking.freightRate).toFixed(2) : 'Not set'}</div>
        <div><strong>Local Charges:</strong> ${booking.localChargesRate ? '$' + Number(booking.localChargesRate).toFixed(2) : 'Not set'}</div>
        <div><strong>Other Charges:</strong> ${booking.otherChargesRate ? '$' + Number(booking.otherChargesRate).toFixed(2) : 'Not set'}</div>
        <div><strong>Customer Bill:</strong> ${booking.customerBillingTotal ? '$' + Number(booking.customerBillingTotal).toFixed(2) : 'Not set'}</div>
        <div><strong>Cargo:</strong> ${booking.cargo}</div>
        <div><strong>Container:</strong> ${booking.container}</div>
        <div><strong>Source:</strong> ${booking.source}</div>
        <div><strong>ETD:</strong> ${booking.etd}</div>
        <div><strong>ETA:</strong> ${booking.eta}</div>
        <div><strong>BL No:</strong> ${booking.blNumber || '-'}</div>
        <div><strong>BL Type:</strong> ${booking.blType || 'Not issued'}</div>
        <div><strong>BL Status:</strong> ${booking.blStatus}</div>
      </div>

      <div class="actions">
        <button class="secondary" data-action="edit" data-id="${booking.id}">Edit</button>
        <button class="secondary" data-action="confirm" data-id="${booking.id}" ${canConfirm ? '' : 'disabled'} title="Route, vessel, and rate are required before confirmation.">Confirm</button>
        <button class="secondary" data-action="load" data-id="${booking.id}">Load</button>
        <button class="success" data-action="bl" data-id="${booking.id}" ${booking.status === 'Confirmed' ? '' : 'disabled'} title="BL can only be issued after the booking is confirmed.">Issue BL</button>
        <button class="secondary" data-action="preview" data-id="${booking.id}" ${hasIssuedBl ? '' : 'disabled'} title="Preview the issued Bill of Lading.">Preview BL</button>
        <button class="danger" data-action="release" data-id="${booking.id}">Release</button>
      </div>
    `;

    listEl.appendChild(card);
  });

  document.querySelectorAll('[data-action]').forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.dataset.action;
      const id = Number(button.dataset.id);

      if (action === 'edit') {
        const booking = bookings.find((item) => item.id === id);
        if (booking) {
          openEditModal(booking);
        }
        return;
      }

      if (action === 'confirm') {
        const booking = bookings.find((item) => item.id === id);
        if (!booking || !hasMandatoryBookingFields(booking)) {
          alert('Please complete Route, Vessel, and Rate before confirming this booking.');
          return;
        }

        bookings = bookings.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              status: 'Confirmed',
              confirmationSent: true
            };
          }
          return item;
        });
        saveBookings();
        render();
        return;
      }

      if (action === 'load') updateBookingStatus(id, 'Loaded');
      if (action === 'bl') {
        const booking = bookings.find((item) => item.id === id);
        if (!booking || booking.status !== 'Confirmed') {
          alert('BL can only be issued after the booking has been confirmed.');
          return;
        }
        openIssueBlModal(booking);
      }
      if (action === 'preview') {
        const booking = bookings.find((item) => item.id === id);
        if (!booking || !(booking.blStatus === 'Issued' || (booking.blNumber && booking.blNumber !== '-'))) {
          alert('No BL has been issued for this booking yet.');
          return;
        }
        openBlPrintout(booking);
      }
      if (action === 'release') updateBookingStatus(id, 'Released');
    });
  });
}

function render() {
  renderStats();
  renderBookings();
}

form.addEventListener('submit', createBookingFromForm);

editForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const bookingId = Number(editBookingIdInput.value || 0);
  const formData = new FormData(event.currentTarget);
  const values = getBookingValues(formData);

  if (!bookingId || !hasMandatoryBookingFields(values)) {
    alert('Please complete Route, Vessel, and Freight Rate before saving this booking.');
    return;
  }

  bookings = bookings.map((booking) => {
    if (booking.id === bookingId) {
      return {
        ...booking,
        ...values,
        route: values.route || `${values.origin || ''} → ${values.destination || ''}`,
        rate: values.rate || booking.rate || '',
        freightRate: values.freightRate || booking.freightRate || '',
        localChargesRate: values.localChargesRate || booking.localChargesRate || '',
        otherChargesRate: values.otherChargesRate || booking.otherChargesRate || '',
        customerBillingTotal: values.customerBillingTotal || booking.customerBillingTotal || '',
        vessel: values.vessel || booking.vessel || '',
        status: booking.status === 'Confirmed' ? 'Confirmed' : booking.status
      };
    }
    return booking;
  });

  saveBookings();
  closeEditModal();
  render();
});

closeEditModalButton.addEventListener('click', closeEditModal);
closeIssueBlModalButton.addEventListener('click', closeIssueBlModal);
editModal.addEventListener('click', (event) => {
  if (event.target === editModal) {
    closeEditModal();
  }
});
issueBlModal.addEventListener('click', (event) => {
  if (event.target === issueBlModal) {
    closeIssueBlModal();
  }
});
closeBlPrintoutButton.addEventListener('click', closeBlPrintout);
blPrintoutModal.addEventListener('click', (event) => {
  if (event.target === blPrintoutModal) {
    closeBlPrintout();
  }
});

['freightRate', 'localChargesRate', 'otherChargesRate'].forEach((fieldName) => {
  editForm.querySelector(`[name="${fieldName}"]`).addEventListener('input', updateCustomerBillingTotal);
});

document.getElementById('printBlButton').addEventListener('click', () => {
  window.print();
});

document.getElementById('emailBlButton').addEventListener('click', () => {
  const blDocument = blPrintoutContent.textContent.replace(/\s+/g, ' ').trim();
  const subject = encodeURIComponent('BL issued for shipment');
  const body = encodeURIComponent(`Please find the issued BL attached.\n\n${blDocument}`);
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
});

document.getElementById('ediBlButton').addEventListener('click', () => {
  const bookingId = issueBlBookingIdInput.value || '';
  alert(`EDI transmission queued for booking ${bookingId}.`);
});

issueBlForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const bookingId = Number(issueBlBookingIdInput.value || 0);
  const formData = new FormData(event.currentTarget);
  const blNumber = formData.get('blNumber')?.toString().trim() || `BL-${String(Date.now()).slice(-5)}`;
  const blType = formData.get('blType')?.toString().trim() || 'Original';

  let issuedBooking = null;

  bookings = bookings.map((booking) => {
    if (booking.id === bookingId) {
      issuedBooking = {
        ...booking,
        blNumber,
        blType,
        blStatus: 'Issued',
        status: 'BL Issued'
      };
      return issuedBooking;
    }
    return booking;
  });

  saveBookings();
  closeIssueBlModal();
  render();

  if (issuedBooking) {
    openBlPrintout(issuedBooking);
  }
});

render();
