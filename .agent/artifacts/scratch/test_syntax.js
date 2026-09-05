
window.MOD_DonHang = (function() {
  // ================= STATE =================
  let rawDonHang = [];
  let rawDonHangCt = [];
  let rawLichCongViec = [];
  let rawThuChi = [];
  let rawCongNoNcc = [];
  
  let currentTab = 'tab-dang-lam';
  let mainTable = null;
  let chartDonChot = null;
  let chartDoanhThuThang = null;
  let chartLoaiDv = null;
  let chartNguonKhach = null;
  let chartTyTrongCp = null;

  let startDate = dayjs().startOf('month').format('YYYY-MM-DD');
  let endDate = dayjs().endOf('month').format('YYYY-MM-DD');
  const formatter = new Intl.NumberFormat('vi-VN');
  

// ================= CHARTS =================
  Chart.defaults.color = '#9ca3af';
  Chart.defaults.borderColor = 'rgba(156, 163, 175, 0.1)';
  Chart.defaults.font.family = 'Inter, sans-serif';
  Chart.defaults.font.size = 11;

  function updateCharts(donHangData, lichData, inAnData) {
    const barDatalabelsPlugin = {
      datalabels: {
        display: true,
        color: document.documentElement.classList.contains('dark') ? '#cbd5e1' : '#475569',
        anchor: 'end',
        align: 'end',
        font: { weight: 'bold', size: 10 },
        formatter: (value) => value > 0 ? compactFormat(value) : ''
      }
    };
    const pieCalloutPlugin = {
      id: 'pieCallout',
      afterDraw: function(chart) {
        if (chart.config.type !== 'pie' && chart.config.type !== 'doughnut') return;
        const ctx = chart.ctx;
        const dataset = chart.data.datasets[0];
        const meta = chart.getDatasetMeta(0);
        const total = dataset.data.reduce((a, b) => a + b, 0);
        const isDark = document.documentElement.classList.contains('dark');
        const color = isDark ? '#94a3b8' : '#64748b';

        let leftLabels = [];
        let rightLabels = [];

        meta.data.forEach((arc, i) => {
          const val = dataset.data[i];
          if (!val || val === 0) return;
          if (val / total >= 0.15 || val / total < 0.03) return;
          
          const centerAngle = arc.startAngle + (arc.endAngle - arc.startAngle) / 2;
          const radius = arc.outerRadius;
          const x = arc.x;
          const y = arc.y;

          const startX = x + Math.cos(centerAngle) * radius;
          const startY = y + Math.sin(centerAngle) * radius;

          const isRight = centerAngle < Math.PI / 2 || centerAngle > (Math.PI * 3) / 2;
          
          const pct = Math.round((val / total) * 100);
          const labelObj = {
            text: `${compactFormat(val)} (${pct}%)`,
            startX, startY,
            midX: x + Math.cos(centerAngle) * (radius + 20),
            midY: y + Math.sin(centerAngle) * (radius + 20),
            cx: x, cy: y, radius: radius,
            isRight
          };

          if (isRight) rightLabels.push(labelObj);
          else leftLabels.push(labelObj);
        });

        function layoutLabels(labels, isRight) {
          labels.sort((a, b) => a.midY - b.midY);
          let lastY = -999;
          labels.forEach(l => {
            if (l.midY < lastY + 16) l.midY = lastY + 16;
            lastY = l.midY;
            
            const dy = l.midY - l.cy;
            const R = l.radius + 20;
            if (Math.abs(dy) <= R) {
               const dx = Math.sqrt(R*R - dy*dy);
               l.midX = l.cx + (isRight ? dx : -dx);
            } else {
               l.midX = l.cx + (isRight ? R : -R);
            }
          });

          labels.forEach(l => {
            const endX = l.midX + (isRight ? 10 : -10);
            const endY = l.midY;

            ctx.beginPath();
            ctx.moveTo(l.startX, l.startY);
            ctx.lineTo(l.midX, l.midY);
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.fillStyle = color;
            ctx.font = 'bold 8.5px Inter, sans-serif';
            ctx.textAlign = isRight ? 'left' : 'right';
            ctx.textBaseline = 'middle';
            ctx.fillText(l.text, endX + (isRight ? 4 : -4), endY);
          });
        }

        layoutLabels(rightLabels, true);
        layoutLabels(leftLabels, false);
      }
    };
    
    const isDark = document.documentElement.classList.contains('dark');
    const pieBorderColor = isDark ? '#1e293b' : '#ffffff';

    // 1. Chart: Đơn chốt theo ngày (Bar)
    const datesMap = {};
    donHangData.forEach(r => {
      if (!r.ngay_hop_dong) return;
      const d = parseDateSafe(r.ngay_hop_dong);
      if(d) {
         const ds = d.format('DD/MM');
         datesMap[ds] = (datesMap[ds] || 0) + 1;
      }
    });

    const sortedDates = [];
    const donChotData = [];
    let cDate1 = dayjs(startDate);
    const todayCap1 = dayjs();
    const eDate1 = dayjs(endDate).isAfter(todayCap1) ? todayCap1 : dayjs(endDate);
    const diff1 = eDate1.diff(cDate1, 'day');
    if (diff1 <= 60) {
      while (cDate1.isSameOrBefore(eDate1)) {
        const ds = cDate1.format('DD/MM');
        sortedDates.push(ds);
        donChotData.push(datesMap[ds] || 0);
        cDate1 = cDate1.add(1, 'day');
      }
    } else {
      Object.keys(datesMap).sort((a,b) => dayjs(a, 'DD/MM').diff(dayjs(b, 'DD/MM'))).forEach(d => {
        sortedDates.push(d);
        donChotData.push(datesMap[d]);
      });
    }

    if (chartDonChot) chartDonChot.destroy();
    const ctx1 = document.getElementById('chart-don-chot').getContext('2d');
    chartDonChot = new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: sortedDates,
        datasets: [{
          label: 'Số đơn chốt',
          data: donChotData,
          backgroundColor: '#3b82f6',
          borderRadius: 6,
          maxBarThickness: 30
        }]
      },
      options: {
        devicePixelRatio: Math.max(window.devicePixelRatio || 1, 2),
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: { top: 25 } },
        plugins: { 
          legend: { display: false }, 
          ...barDatalabelsPlugin,
          tooltip: { mode: 'index', intersect: false }
        },
        scales: { 
          x: { grid: { display: false } },
          y: { beginAtZero: true, ticks: { stepSize: 1, callback: function(val) { return compactFormat(val); } } } 
        }
      }
    });

    // 2. Chart: Doanh thu & Thực thu theo ngày (Combo)
    const dtDayMap = {};
    donHangData.forEach(r => {
      if (!r.ngay_hop_dong) return;
      const d = parseDateSafe(r.ngay_hop_dong);
      if (d) {
        const ds = d.format('DD/MM');
        if (!dtDayMap[ds]) dtDayMap[ds] = { doanhThu: 0, thucThu: 0 };
        dtDayMap[ds].doanhThu += parseAmount(r.tong_tien);
        dtDayMap[ds].thucThu += parseAmount(r.da_thanh_toan);
      }
    });

    const sortedDtDays = [];
    const doanhThuData = [];
    const thucThuData = [];
    let cDate2 = dayjs(startDate);
    const todayCap2 = dayjs();
    const eDate2 = dayjs(endDate).isAfter(todayCap2) ? todayCap2 : dayjs(endDate);
    const diff2 = eDate2.diff(cDate2, 'day');
    if (diff2 <= 60) {
      while (cDate2.isSameOrBefore(eDate2)) {
        const ds = cDate2.format('DD/MM');
        sortedDtDays.push(ds);
        doanhThuData.push(dtDayMap[ds] ? dtDayMap[ds].doanhThu : 0);
        thucThuData.push(dtDayMap[ds] ? dtDayMap[ds].thucThu : 0);
        cDate2 = cDate2.add(1, 'day');
      }
    } else {
      Object.keys(dtDayMap).sort((a,b) => dayjs(a, 'DD/MM').diff(dayjs(b, 'DD/MM'))).forEach(d => {
        sortedDtDays.push(d);
        doanhThuData.push(dtDayMap[d].doanhThu);
        thucThuData.push(dtDayMap[d].thucThu);
      });
    }

    if (chartDoanhThuThang) chartDoanhThuThang.destroy();
    const ctx2 = document.getElementById('chart-doanh-thu-thang').getContext('2d');
    chartDoanhThuThang = new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: sortedDtDays,
        datasets: [
          {
            type: 'line',
            label: 'Doanh Thu',
            data: doanhThuData,
            borderColor: '#10b981', // emerald-500
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 6,
            fill: true,
            datalabels: { display: false }
          },
          {
            type: 'bar',
            label: 'Thực Thu',
            data: thucThuData,
            backgroundColor: '#38bdf8', // sky-400
            borderRadius: 6,
            maxBarThickness: 30
          }
        ]
      },
      options: {
        devicePixelRatio: Math.max(window.devicePixelRatio || 1, 2),
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: { top: 25 } },
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { position: 'bottom', labels: { color: '#9ca3af' } },
          ...barDatalabelsPlugin
        },
        scales: {
          x: { grid: { display: false } },
          y: { beginAtZero: true, ticks: { callback: function(val) { return compactFormat(val); } } }
        }
      }
    });

    // 3. Pie Chart: Tỷ trọng theo Loại dịch vụ
    const loaiDvMap = {};
    donHangData.forEach(r => {
      const l = String(r.loai_dich_vu || 'Khác').trim();
      loaiDvMap[l] = (loaiDvMap[l] || 0) + parseAmount(r.tong_tien);
    });
    const loaiDvLabels = Object.keys(loaiDvMap);
    const loaiDvData = Object.values(loaiDvMap);

    if (chartLoaiDv) chartLoaiDv.destroy();
    const ctx3 = document.getElementById('chart-loai-dv').getContext('2d');
    chartLoaiDv = new Chart(ctx3, {
      type: 'doughnut',
      data: {
        labels: loaiDvLabels,
        datasets: [{
          data: loaiDvData,
          backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'],
          borderWidth: 1, borderColor: pieBorderColor
        }]
      },
      plugins: [pieCalloutPlugin],
      options: {
        devicePixelRatio: Math.max(window.devicePixelRatio || 1, 2),
        responsive: true, maintainAspectRatio: false, layout: { padding: 45 },
        plugins: { 
          legend: { position: 'left', labels: { color: '#9ca3af' } },
          datalabels: { 
            display: function(ctx) {
              const val = ctx.dataset.data[ctx.dataIndex];
              const total = ctx.dataset.data.reduce((a,b) => a+b, 0);
              return (val / total >= 0.15);
            },
            color: '#ffffff',
            font: { weight: 'bold', size: 9, family: 'Inter' },
            formatter: function(val, ctx) {
              const total = ctx.dataset.data.reduce((a,b) => a+b, 0);
              const pct = Math.round((val / total) * 100);
              return `${compactFormat(val)} (${pct}%)`;
            }
          }
        }
      }
    });

    // 4. Pie Chart: Tỷ trọng theo Nguồn khách
    const nguonMap = {};
    donHangData.forEach(r => {
      const n = String(r.nguon_khach || 'Khác').trim();
      nguonMap[n] = (nguonMap[n] || 0) + parseAmount(r.tong_tien);
    });
    const nguonLabels = Object.keys(nguonMap);
    const nguonData = Object.values(nguonMap);

    if (chartNguonKhach) chartNguonKhach.destroy();
    const ctx4 = document.getElementById('chart-nguon-khach').getContext('2d');
    chartNguonKhach = new Chart(ctx4, {
      type: 'doughnut',
      data: {
        labels: nguonLabels,
        datasets: [{
          data: nguonData,
          backgroundColor: ['#ec4899', '#f97316', '#14b8a6', '#6366f1', '#eab308', '#64748b'],
          borderWidth: 1, borderColor: pieBorderColor
        }]
      },
      plugins: [pieCalloutPlugin],
      options: {
        devicePixelRatio: Math.max(window.devicePixelRatio || 1, 2),
        responsive: true, maintainAspectRatio: false, layout: { padding: 45 },
        plugins: { 
          legend: { position: 'left', labels: { color: '#9ca3af' } },
          datalabels: { 
            display: function(ctx) {
              const val = ctx.dataset.data[ctx.dataIndex];
              const total = ctx.dataset.data.reduce((a,b) => a+b, 0);
              return (val / total >= 0.15);
            },
            color: '#ffffff',
            font: { weight: 'bold', size: 9, family: 'Inter' },
            formatter: function(val, ctx) {
              const total = ctx.dataset.data.reduce((a,b) => a+b, 0);
              const pct = Math.round((val / total) * 100);
              return `${compactFormat(val)} (${pct}%)`;
            }
          }
        }
      }
    });

    // 5. Pie Chart: Tỷ trọng chi phí
    let sumCpSale = 0, sumCpSp = 0, sumCpInAn = 0;
    donHangData.forEach(r => sumCpSale += parseAmount(r.luong_ki_on) + parseAmount(r.luong_ki_off));
    lichData.forEach(r => sumCpSp += parseAmount(r.luong_nhan_vien));
    inAnData.forEach(r => sumCpInAn += parseAmount(r.tong_tien));

    if (chartTyTrongCp) chartTyTrongCp.destroy();
    const ctx5 = document.getElementById('chart-ty-trong-cp').getContext('2d');
    chartTyTrongCp = new Chart(ctx5, {
      type: 'doughnut',
      data: {
        labels: ['CP Sale', 'CP Lương SP', 'CP In Ấn'],
        datasets: [{
          data: [sumCpSale, sumCpSp, sumCpInAn],
          backgroundColor: ['#f87171', '#f472b6', '#c084fc'],
          borderWidth: 1, borderColor: pieBorderColor
        }]
      },
      plugins: [pieCalloutPlugin],
      options: {
        responsive: true, maintainAspectRatio: false, layout: { padding: 45 },
        plugins: {
          legend: { position: 'left', labels: { color: '#9ca3af', padding: 20 } },
          tooltip: { callbacks: { label: function(ctx) { return ' ' + formatter.format(ctx.raw) + ' ₫'; } } },
          datalabels: { 
            display: function(ctx) {
              const val = ctx.dataset.data[ctx.dataIndex];
              const total = ctx.dataset.data.reduce((a,b) => a+b, 0);
              return (val / total >= 0.15);
            },
            color: '#ffffff',
            font: { weight: 'bold', size: 9, family: 'Inter' },
            formatter: function(val, ctx) {
              const total = ctx.dataset.data.reduce((a,b) => a+b, 0);
              const pct = Math.round((val / total) * 100);
              return `${compactFormat(val)} (${pct}%)`;
            }
          }
        }
      }
    });
  }

  // ================= TABLE =================
  function getStatusBadge(st) {
    if (!st) return `<span class="font-semibold text-slate-500 dark:text-slate-400">N/A</span>`;
    if (st.includes('HD04')) return `<span class="font-semibold text-blue-600 dark:text-blue-400">${st}</span>`;
    if (st.includes('HD05')) return `<span class="font-semibold text-orange-600 dark:text-orange-400">${st}</span>`;
    if (st.includes('HD06')) return `<span class="font-semibold text-emerald-600 dark:text-emerald-400">${st}</span>`;
    if (st.includes('HD07')) return `<span class="font-semibold text-purple-600 dark:text-purple-400">${st}</span>`;
    if (st.includes('HD08')) return `<span class="font-semibold text-indigo-600 dark:text-indigo-400">${st}</span>`;
    if (st.includes('HD09')) return `<span class="font-semibold text-green-600 dark:text-green-400">${st}</span>`;
    return `<span class="font-semibold text-slate-600 dark:text-slate-400 whitespace-nowrap">${st}</span>`;
  }

  function deleteRecord(recordId) {
    if (!confirm("Anh/Chị có chắc chắn muốn xóa đơn hàng này không? Tất cả các chi tiết liên quan cũng sẽ bị ảnh hưởng.")) return;

    showLoader("Đang xóa dữ liệu đơn hàng...");
    google.script.run
      .withSuccessHandler(function(res) {
        hideLoader();
        if (res.success) {
          showSuccess("Đã xóa đơn hàng thành công!");
          fetchDataLake(true);
        } else {
          showError("Lỗi từ server: " + res.message);
        }
      })
      .withFailureHandler(function(err) {
        hideLoader();
        showError("Lỗi kết nối: " + err.message);
      })
      .MOD_CRUD_deleteRecord('don_hang', recordId, localStorage.getItem('erp_master_profile'));
  }

  function renderTable(data) {
    if (mainTable) {
      mainTable.destroy();
    }

    const tbody = $('#main-table tbody');
    tbody.empty();

    data.forEach(r => {
      let hdDate = '';
      const dp = parseDateSafe(r.ngay_hop_dong);
      if(dp) hdDate = dp.format('DD/MM/YYYY');

      const stText = String(r.ten_trang_thai || r.trang_thai).trim();
      const st = getStatusBadge(stText);
      
      const editDataEscaped = encodeURIComponent(JSON.stringify(r));
      const tdAction = `
        <td class="py-3 px-4 text-center">
          <div class="flex items-center justify-center gap-1.5">
            <button class="w-7 h-7 rounded-lg bg-blue-500/10 hover:bg-blue-500 hover:text-white text-blue-500 flex items-center justify-center transition-all" 
              onclick="event.stopPropagation(); window.AppCRUD.openEditForm('don_hang', JSON.parse(decodeURIComponent('${editDataEscaped}')))" title="Sửa">
              <i class="fa-solid fa-pen-to-square text-xs"></i>
            </button>
            <button class="w-7 h-7 rounded-lg bg-rose-500/10 hover:bg-rose-500 hover:text-white text-rose-500 flex items-center justify-center transition-all" 
              onclick="event.stopPropagation(); window.MOD_DonHang.deleteRecord('${r.id_don_hang}')" title="Xóa">
              <i class="fa-solid fa-trash-can text-xs"></i>
            </button>
          </div>
        </td>`;

      const tr = `
        <tr class="cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors border-b border-slate-100 dark:border-slate-800/60" onclick="window.MOD_DonHang.openDrilldown('${r.id_don_hang}')">
          <td class="font-medium text-blue-400 py-3 px-4">${r.id_don_hang}</td>
          <td class="py-3 px-4">${hdDate}</td>
          <td class="py-3 px-4">
            <div class="font-bold text-slate-800 dark:text-white">${r.nhan_khach_hang || r.ten_khach_hang || ''}</div>
            <div class="text-xs text-gray-500">${r.so_dien_thoai || ''}</div>
          </td>
          <td class="py-3 px-4">${r.chi_nhanh || ''}</td>
          <td class="py-3 px-4">${r.loai_dich_vu || ''}</td>
          <td class="py-3 px-4">${st}</td>
          <td class="py-3 px-4 text-right"><span class="font-semibold text-green-600 dark:text-green-400">${formatter.format(parseAmount(r.tong_tien))}</span></td>
          <td class="py-3 px-4 text-right"><span class="font-semibold text-teal-600 dark:text-teal-400">${formatter.format(parseAmount(r.da_thanh_toan))}</span></td>
          <td class="py-3 px-4 text-right"><span class="font-semibold text-orange-600 dark:text-orange-400">${formatter.format(parseAmount(r.con_lai))}</span></td>
          ${tdAction}
        </tr>
      `;
      tbody.append(tr);
    });

    mainTable = $('#main-table').DataTable({
      responsive: true,
      fixedHeader: true,
      pageLength: 15,
      dom: '<"min-h-[300px]"rt><"flex flex-col md:flex-row justify-between items-center mt-4 text-xs text-gray-500"ip>',
      order: [[1, 'desc']],
      columnDefs: [
        { targets: [9], orderable: false }
      ],
        language: {
        search: "Tìm kiếm:",
        lengthMenu: "Hiện _MENU_ dòng",
        info: "Hiển thị _START_ đến _END_ của _TOTAL_ đơn hàng",
        infoEmpty: "Không có dữ liệu",
        paginate: { first: "Đầu", last: "Cuối", next: "Sau", previous: "Trước" },
        zeroRecords: "Không tìm thấy kết quả"
      }
    });
  }

  // ================= DRILL-DOWN =================
  function openDrilldown(id) {
    id = String(id).trim();
    $('#offcanvas-id').text('ID: ' + id);
    
    // Kích hoạt mặc định Tab 1 (Thông tin đơn hàng)
    $('.drill-tab-btn').removeClass('active border-blue-500 text-blue-600 dark:text-blue-400').addClass('border-transparent text-slate-400');
    $('.drill-tab-btn[data-drill-tab="drill-tab-general"]').addClass('active border-blue-500 text-blue-600 dark:text-blue-400').removeClass('border-transparent text-slate-400');
    $('.drill-tab-content').addClass('hidden');
    $('#drill-tab-general').removeClass('hidden');

    // Lấy bản ghi đơn hàng
    const dh = rawDonHang.find(r => String(r.id_don_hang).trim() === id) || {};
    
    // Render Tab 1: Thông tin đơn hàng
    const divGen = $('#drill-tab-general');
    divGen.empty();
    
    const fields = [
      { key: 'id_don_hang', label: 'Mã Đơn Hàng' },
      { key: 'ten_khach_hang', label: 'Tên Khách Hàng' },
      { key: 'so_dien_thoai', label: 'Số Điện Thoại' },
      { key: 'dia_chi', label: 'Địa Chỉ' },
      { key: 'so_cccd', label: 'Số CCCD' },
      { key: 'ngay', label: 'Ngày Tạo', isDate: true },
      { key: 'chi_nhanh', label: 'Chi Nhánh' },
      { key: 'NV_sale_on', label: 'NV Sale Online' },
      { key: 'NV_sale_off', label: 'NV Sale Offline' },
      { key: 'nguon_khach', label: 'Nguồn Khách' },
      { key: 'nhom_khach', label: 'Nhóm Khách' },
      { key: 'loai_dich_vu', label: 'Loại Dịch Vụ' },
      { key: 'trang_thai', label: 'Trạng Thái' },
      { key: 'ngay_hop_dong', label: 'Ngày Hợp Đồng', isDate: true },
      { key: 'ly_do_khach_hang_khong_ky', label: 'Lý Do Không Ký' },
      { key: 'ten_co_dau', label: 'Tên Cô Dâu' },
      { key: 'ten_chu_re', label: 'Tên Chú Rể' },
      { key: 'link_nhom_zalo', label: 'Link nhóm Zalo', isLink: true },
      { key: 'link_anh_goc', label: 'Link ảnh gốc', isLink: true },
      { key: 'ngay_chup', label: 'Ngày Chụp', isDate: true },
      { key: 'thoi_gian_bat_dau', label: 'Thời Gian Bắt Đầu' },
      { key: 'dia_diem', label: 'Địa Điểm chụp' },
      { key: 'ngay_cuoi', label: 'Ngày Cưới', isDate: true },
      { key: 'ngay_hoan_thanh', label: 'Ngày Hoàn Thành', isDate: true },
      { key: 'chi_phi_cost', label: 'Chi Phí Cost', isPrice: true },
      { key: 'loi_nhuan_thuan', label: 'Lợi Nhuận Thuần', isPrice: true },
      { key: 'doanh_so_on', label: 'Doanh Số Online', isPrice: true },
      { key: 'doanh_so_off', label: 'Doanh Số Offline', isPrice: true },
      { key: 'luong_ki_on', label: 'Lương Kỳ Online', isPrice: true },
      { key: 'luong_ki_off', label: 'Lương Kỳ Offline', isPrice: true },
      { key: 'ghi_chu', label: 'Ghi Chú' }
    ];

    fields.forEach(f => {
      let val = dh[f.key] !== undefined ? dh[f.key] : '';
      if (val === '' || val === null || val === undefined) {
        val = '-';
      } else if (f.isPrice) {
        val = formatter.format(parseAmount(val)) + ' ₫';
      } else if (f.isDate) {
        const dObj = parseDateSafe(val);
        if (dObj) val = dObj.format('DD/MM/YYYY');
      } else if (f.isLink && val !== '-') {
        val = `<a href="${val}" target="_blank" class="text-blue-500 hover:underline flex items-center gap-1.5"><i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i> Đi tới liên kết</a>`;
      }
      
      divGen.append(`
        <div class="flex flex-col space-y-1 py-2 border-b border-slate-100 dark:border-slate-800/60">
          <span class="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">${f.label}</span>
          <span class="text-xs font-semibold text-slate-800 dark:text-slate-100 break-words">${val}</span>
        </div>
      `);
    });

    // Render Tab 2: Chi tiết đơn hàng dạng Accordion
    const ctList = rawDonHangCt.filter(r => String(r.id_don_hang).trim() === id);
    const ctListContainer = $('#drill-ct-list');
    ctListContainer.empty();
    if (ctList.length === 0) {
      ctListContainer.append('<div class="p-3 text-center text-slate-500 dark:text-slate-400 text-xs">Không có chi tiết đơn hàng</div>');
    } else {
      ctList.forEach((r, index) => {
        let summaryText = r.ten_san_pham || r.ten_dich_vu || r.danh_sach_san_pham_dv || r.hang_muc || '';
        const qty = r.so_luong || 1;
        const price = parseAmount(r.don_gia || r.gia || 0);
        const discount = parseAmount(r.so_tien_km || r.khuyen_mai || r.giam_gia || 0);
        const subtotal = parseAmount(r.thanh_tien || r.tong_tien || 0);
        
        const formattedSubtotal = new Intl.NumberFormat('vi-VN').format(subtotal) + ' ₫';
        const formattedPrice = new Intl.NumberFormat('vi-VN').format(price) + ' ₫';
        const formattedDiscount = new Intl.NumberFormat('vi-VN').format(discount) + ' ₫';

        const itemHtml = `
          <div class="accordion-item border border-slate-100 dark:border-slate-800 rounded-xl p-3 bg-slate-50/30 dark:bg-slate-900/10">
            <div class="accordion-header flex items-center justify-between cursor-pointer select-none">
              <div class="flex items-center gap-2.5 w-3/4">
                <i class="fa-solid fa-chevron-down text-slate-400 text-[10px] toggle-icon"></i>
                <span class="font-bold text-xs text-slate-700 dark:text-slate-200 truncate">${index + 1}. ${summaryText}</span>
                <span class="bg-blue-50 dark:bg-blue-950/30 px-1.5 py-0.5 rounded text-[9px] text-blue-600 dark:text-blue-400 font-bold">${formattedSubtotal}</span>
              </div>
            </div>
            <div class="accordion-body hidden grid grid-cols-2 gap-2.5 pt-3 mt-2 border-t border-slate-100 dark:border-slate-800/60 text-xs">
              <div><span class="text-slate-400">Hạng mục:</span> <span class="font-semibold text-slate-700 dark:text-slate-300">${r.hang_muc || '-'}</span></div>
              <div><span class="text-slate-400">Chi nhánh:</span> <span class="font-semibold text-slate-700 dark:text-slate-300">${r.chi_nhanh || '-'}</span></div>
              <div><span class="text-slate-400">Số lượng:</span> <span class="font-semibold text-slate-700 dark:text-slate-300">${qty}</span></div>
              <div><span class="text-slate-400">Đơn giá:</span> <span class="font-semibold text-slate-700 dark:text-slate-300">${formattedPrice}</span></div>
              <div><span class="text-slate-400">Khuyến mãi:</span> <span class="font-semibold text-slate-700 dark:text-slate-300">${formattedDiscount}</span></div>
              <div><span class="text-slate-400">Quy trình:</span> <span class="font-semibold text-slate-700 dark:text-slate-300">${r.trang_thai || '-'}</span></div>
              <div class="col-span-2"><span class="text-slate-400">Ghi chú:</span> <span class="font-semibold text-slate-700 dark:text-slate-300">${r.ghi_chu || '-'}</span></div>
            </div>
          </div>
        `;
        ctListContainer.append(itemHtml);
      });
    }

    // Render Tab 3: Thanh toán
    $('#drill-pay-total').text(formatter.format(parseAmount(dh.tong_tien)) + ' ₫');
    $('#drill-pay-paid').text(formatter.format(parseAmount(dh.da_thanh_toan)) + ' ₫');
    $('#drill-pay-debt').text(formatter.format(parseAmount(dh.con_lai)) + ' ₫');

    const tcList = rawThuChi.filter(r => String(r.id_don_hang).trim() === id);
    const tcListContainer = $('#drill-thuchi-list');
    tcListContainer.empty();
    if (tcList.length === 0) {
      tcListContainer.append('<div class="p-3 text-center text-slate-500 dark:text-slate-400 text-xs">Không có giao dịch thanh toán</div>');
    } else {
      tcList.forEach((r, index) => {
        let dStr = '';
        const tD = parseDateSafe(r.ngay_lap || r.ngay || r.ngay_thanh_toan || r.created_at);
        if(tD) dStr = tD.format('DD/MM/YYYY');
        
        const amt = parseAmount(r.so_tien || r.tong_tien || r.thanh_tien);
        const formattedAmount = formatter.format(amt) + ' ₫';
        const isThu = String(r.hang_muc).trim().toLowerCase() === "thu";
        
        const itemHtml = `
          <div class="accordion-item border border-slate-100 dark:border-slate-800 rounded-xl p-3 bg-slate-50/30 dark:bg-slate-900/10">
            <div class="accordion-header flex items-center justify-between cursor-pointer select-none">
              <div class="flex items-center gap-2.5 w-3/4">
                <i class="fa-solid fa-chevron-down text-slate-400 text-[10px] toggle-icon"></i>
                <span class="font-bold text-xs text-slate-700 dark:text-slate-200 truncate">${index + 1}. Ngày ${dStr} - [${r.hang_muc || ''}]</span>
                <span class="px-1.5 py-0.5 rounded text-[9px] font-bold ${isThu ? 'bg-emerald-55 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400' : 'bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-450'}">${formattedAmount}</span>
              </div>
            </div>
            <div class="accordion-body hidden grid grid-cols-2 gap-2.5 pt-3 mt-2 border-t border-slate-100 dark:border-slate-800/60 text-xs">
              <div><span class="text-slate-400">Hình thức TT:</span> <span class="font-semibold text-slate-700 dark:text-slate-300">${r.hinh_thuc_tt || '-'}</span></div>
              <div><span class="text-slate-400">Tài khoản Nợ:</span> <span class="font-semibold text-slate-700 dark:text-slate-300 font-mono">${r.tai_khoan_no || '-'}</span></div>
              <div><span class="text-slate-400">Tài khoản Có:</span> <span class="font-semibold text-slate-700 dark:text-slate-300 font-mono">${r.tai_khoan_co || '-'}</span></div>
              <div><span class="text-slate-400">Trạng thái:</span> <span class="font-semibold text-slate-700 dark:text-slate-300">${r.trang_thai || '-'}</span></div>
              <div class="col-span-2"><span class="text-slate-400">Nội dung:</span> <span class="font-semibold text-slate-700 dark:text-slate-300">${r.noi_dung || '-'}</span></div>
              <div class="col-span-2"><span class="text-slate-400">Ghi chú:</span> <span class="font-semibold text-slate-700 dark:text-slate-300">${r.ghi_chu || '-'}</span></div>
            </div>
          </div>
        `;
        tcListContainer.append(itemHtml);
      });
    }

    $('#offcanvas').removeClass('translate-x-full');
    $('#offcanvas-backdrop').removeClass('hidden');
  }

  function closeDrilldown() {
    $('#offcanvas').addClass('translate-x-full');
    $('#offcanvas-backdrop').addClass('hidden');
  }

  // ================= EVENTS =================
  function setupEventHandlers() {
    $('#filter-time').on('change', function() {
      const val = $(this).val();
      if (val === 'custom') {
        $('#custom-date-wrapper').removeClass('hidden').addClass('flex');
      } else {
        $('#custom-date-wrapper').removeClass('flex').addClass('hidden');
        const today = dayjs();
        switch (val) {
          case 'month': startDate = today.startOf('month').format('YYYY-MM-DD'); endDate = today.endOf('month').format('YYYY-MM-DD'); break;
          case 'last_month': startDate = today.subtract(1, 'month').startOf('month').format('YYYY-MM-DD'); endDate = today.subtract(1, 'month').endOf('month').format('YYYY-MM-DD'); break;
          case 'quarter': startDate = today.startOf('quarter').format('YYYY-MM-DD'); endDate = today.endOf('quarter').format('YYYY-MM-DD'); break;
          case 'last_quarter': startDate = today.subtract(1, 'quarter').startOf('quarter').format('YYYY-MM-DD'); endDate = today.subtract(1, 'quarter').endOf('quarter').format('YYYY-MM-DD'); break;
          case 'year': startDate = today.startOf('year').format('YYYY-MM-DD'); endDate = today.endOf('year').format('YYYY-MM-DD'); break;
          case 'last_year': startDate = today.subtract(1, 'year').startOf('year').format('YYYY-MM-DD'); endDate = today.subtract(1, 'year').endOf('year').format('YYYY-MM-DD'); break;
        }
        $('#filter-date-start').val(startDate);
        $('#filter-date-end').val(endDate);
        updateDashboard();
      }
    });

    $('#filter-date-start, #filter-date-end').on('change', function() {
      if ($('#filter-time').val() === 'custom') {
        startDate = $('#filter-date-start').val();
        endDate = $('#filter-date-end').val();
        updateDashboard();
      }
    });

    $('select[id^="filter-"]:not(#filter-time)').on('change', function() {
      updateDashboard();
    });

    $('.tab-btn').on('click', function() {
      $('.tab-btn').removeClass('active border-blue-500 text-blue-400').addClass('border-transparent text-gray-400');
      $(this).removeClass('border-transparent text-gray-400').addClass('active border-blue-500 text-blue-400');
      currentTab = $(this).data('tab');
      const { filteredForTable } = getFilteredData();
      renderTable(filteredForTable);
    });

    $('#close-offcanvas, #offcanvas-backdrop').on('click', closeDrilldown);

    $('#syncButton').on('click', function() {
      const btn = $(this);
      const icon = btn.find('i');
      icon.addClass('fa-spin');
      btn.prop('disabled', true).addClass('opacity-50');
      
      fetchDataLake(true);
    });

    $('#btn-export-excel').on('click', function() {
      if (mainTable) {
        var btn = new $.fn.dataTable.Buttons(mainTable, { buttons: [{ extend: 'excelHtml5' }] });
        btn.container().appendTo($('<div>'));
        btn.buttons(0).trigger();
      }
    });
    $('#btn-export-pdf').on('click', function() {
      if (mainTable) {
        var btn = new $.fn.dataTable.Buttons(mainTable, { buttons: [{ extend: 'pdfHtml5' }] });
        btn.container().appendTo($('<div>'));
        btn.buttons(0).trigger();
      }
    });

    // Sự kiện chuyển Tab trong Drawer Chi tiết đơn hàng
    $('.drill-tab-btn').off('click').on('click', function() {
      $('.drill-tab-btn').removeClass('active border-blue-500 text-blue-600 dark:text-blue-400').addClass('border-transparent text-slate-400');
      $(this).addClass('active border-blue-500 text-blue-600 dark:text-blue-400').removeClass('border-transparent text-slate-400');
      
      const tabId = $(this).data('drill-tab');
      $('.drill-tab-content').addClass('hidden');
      $('#' + tabId).removeClass('hidden');
    });
  }

  // ================= HELPERS =================
  function parseAmount(val) {
    if (!val) return 0;
    if (typeof val === 'number') return val;
    let s = String(val).replace(/,/g, '').trim();
    let n = parseFloat(s);
    return isNaN(n) ? 0 : n;
  }

  function parseDateSafe(dateStr) {
      if (!dateStr) return null;
      let s = String(dateStr).trim();
      // Try DD/MM/YYYY first (most common in Vietnam)
      let d = dayjs(s, 'DD/MM/YYYY');
      if (d.isValid()) return d;
      // Fallback
      let d2 = dayjs(s);
      if (d2.isValid()) return d2;
      return null;
  }

  function compactFormat(val) {
    if (!val && val !== 0) return '';
    const num = parseFloat(val);
    if (isNaN(num)) return val;
    if (Math.abs(num) >= 1e9) {
      return (num / 1e9).toFixed(1).replace(/\.0$/, '').replace('.', ',') + ' Tỷ';
    }
    if (Math.abs(num) >= 1e6) {
      return (num / 1e6).toFixed(1).replace(/\.0$/, '').replace('.', ',') + ' Tr';
    }
    if (Math.abs(num) >= 1e3) {
      return (num / 1e3).toFixed(1).replace(/\.0$/, '').replace('.', ',') + ' K';
    }
    return num.toString();
  }

  function calculateTrend(curr, prev, inversed = false) {
    if (prev === 0) {
      return curr > 0 
        ? `<span class="${inversed ? 'text-rose-500' : 'text-emerald-500'} font-bold flex items-center gap-0.5"><i class="fa-solid fa-arrow-trend-up text-[9px]"></i> Tăng (+100%)</span>`
        : `<span class="text-slate-400 font-semibold">-</span>`;
    }
    const percent = ((curr - prev) / prev) * 100;
    if (percent > 0) {
      return `<span class="${inversed ? 'text-rose-500' : 'text-emerald-500'} font-bold flex items-center gap-0.5"><i class="fa-solid fa-arrow-trend-up text-[9px]"></i> Tăng (+${percent.toFixed(1)}%)</span>`;
    }
    if (percent < 0) {
      return `<span class="${inversed ? 'text-emerald-500' : 'text-rose-500'} font-bold flex items-center gap-0.5"><i class="fa-solid fa-arrow-trend-down text-[9px]"></i> Giảm (-${Math.abs(percent).toFixed(1)}%)</span>`;
    }
    return `<span class="text-slate-400 font-semibold">-</span>`;
  }

  function getPreviousDateRange(startObj, endObj, timeFilter) {
    switch (timeFilter) {
      case 'month': return { start: startObj.subtract(1, 'month').startOf('month'), end: startObj.subtract(1, 'month').endOf('month') };
      case 'last_month': return { start: startObj.subtract(1, 'month').startOf('month'), end: startObj.subtract(1, 'month').endOf('month') };
      case 'quarter': return { start: startObj.subtract(1, 'quarter').startOf('quarter'), end: startObj.subtract(1, 'quarter').endOf('quarter') };
      case 'last_quarter': return { start: startObj.subtract(1, 'quarter').startOf('quarter'), end: startObj.subtract(1, 'quarter').endOf('quarter') };
      case 'year': return { start: startObj.subtract(1, 'year').startOf('year'), end: startObj.subtract(1, 'year').endOf('year') };
      case 'last_year': return { start: startObj.subtract(1, 'year').startOf('year'), end: startObj.subtract(1, 'year').endOf('year') };
      case 'custom':
      default:
        const diff = endObj.diff(startObj, 'day');
        return { start: startObj.subtract(diff + 1, 'day'), end: endObj.subtract(diff + 1, 'day') };
    }
  }

  // Default date filter (Tháng này)
  startDate = dayjs().startOf('month').format('YYYY-MM-DD');
  endDate = dayjs().endOf('month').format('YYYY-MM-DD');

  

  // ================= DATA FILTER =================
  function getFilteredData(forDates = null) {
    const sDate = forDates ? forDates.start : dayjs(startDate);
    const eDate = forDates ? forDates.end.endOf('day') : dayjs(endDate).endOf('day');

    let filteredForDash = [];
    let filteredForTable = [];

    rawDonHang.forEach(r => {
      if (!r.ngay_hop_dong) return;
      const d = parseDateSafe(r.ngay_hop_dong);
      if (!d) return;
      if (d.isBefore(sDate) || d.isAfter(eDate)) return;

      const st = String(r.ten_trang_thai || r.trang_thai).trim();
      const b = $('#filter-branch').val();
      if (b && String(r.chi_nhanh).trim() !== b) return;
      const s = $('#filter-service').val();
      if (s && String(r.loai_dich_vu).trim() !== s) return;
      const src = $('#filter-source').val();
      if (src && String(r.nguon_khach).trim() !== src) return;
      const stt = $('#filter-status').val();
      if (stt && !String(r.trang_thai).trim().includes(stt) && !st.includes(stt)) return;

      filteredForDash.push(r);

      const rawStatus = String(r.trang_thai || '').trim();
      const isDone = rawStatus.includes('HD09') || st.includes('HD09') || st.includes('Đã giao trả') || st.includes('Đã xong') || st.includes('Hoàn thành');

      if (currentTab === 'tab-dang-lam') {
        if (!isDone) filteredForTable.push(r);
      } else {
        if (isDone) filteredForTable.push(r);
      }
    });

    let filteredLich = rawLichCongViec.filter(r => {
      return filteredForDash.some(dh => String(dh.id_don_hang).trim() === String(r.id_don_hang).trim());
    });

    let filteredInAn = rawCongNoNcc.filter(r => {
      if (String(r.phan_loai).trim() !== "In ấn") return false;
      return filteredForDash.some(dh => String(dh.id_don_hang).trim() === String(r.id_don_hang).trim());
    });

    return { filteredForDash, filteredForTable, filteredLich, filteredInAn };
  }

  // ================= KPI =================
  function updateKPIs(donHangData, lichData, inAnData, prevDhData = [], prevLichData = [], prevInAnData = []) {
    let tongDon = donHangData.length;
    let doanhThu = 0;
    let thucThu = 0;
    let congNo = 0;
    let cpSale = 0;
    donHangData.forEach(r => {
      doanhThu += parseAmount(r.tong_tien);
      thucThu += parseAmount(r.da_thanh_toan);
      congNo += parseAmount(r.con_lai);
      cpSale += parseAmount(r.luong_ki_on) + parseAmount(r.luong_ki_off);
    });

    let cpLuongSp = 0;
    lichData.forEach(r => cpLuongSp += parseAmount(r.luong_nhan_vien));

    let cpInAn = 0;
    inAnData.forEach(r => cpInAn += parseAmount(r.tong_tien));

    // Calculate previous
    let prevTongDon = prevDhData.length;
    let prevDoanhThu = 0;
    let prevThucThu = 0;
    let prevCongNo = 0;
    let prevCpSale = 0;
    prevDhData.forEach(r => {
      prevDoanhThu += parseAmount(r.tong_tien);
      prevThucThu += parseAmount(r.da_thanh_toan);
      prevCongNo += parseAmount(r.con_lai);
      prevCpSale += parseAmount(r.luong_ki_on) + parseAmount(r.luong_ki_off);
    });

    let prevCpLuongSp = 0;
    prevLichData.forEach(r => prevCpLuongSp += parseAmount(r.luong_nhan_vien));

    let prevCpInAn = 0;
    prevInAnData.forEach(r => prevCpInAn += parseAmount(r.tong_tien));

    $('#kpi-tong-don').text(formatter.format(tongDon));
    $('#trend-tong-don').html(calculateTrend(tongDon, prevTongDon));
    
    $('#kpi-doanh-thu').text(formatter.format(doanhThu) + ' ₫');
    $('#trend-doanh-thu').html(calculateTrend(doanhThu, prevDoanhThu));
    
    $('#kpi-thuc-thu').text(formatter.format(thucThu) + ' ₫');
    $('#trend-thuc-thu').html(calculateTrend(thucThu, prevThucThu));
    
    $('#kpi-cong-no').text(formatter.format(congNo) + ' ₫');
    $('#trend-cong-no').html(calculateTrend(congNo, prevCongNo, true));
    
    $('#kpi-cp-sale').text(formatter.format(cpSale) + ' ₫');
    $('#trend-cp-sale').html(calculateTrend(cpSale, prevCpSale, true));

    $('#kpi-cp-sp').text(formatter.format(cpLuongSp) + ' ₫');
    $('#trend-cp-sp').html(calculateTrend(cpLuongSp, prevCpLuongSp, true));

    $('#kpi-cp-inan').text(formatter.format(cpInAn) + ' ₫');
    $('#trend-cp-inan').html(calculateTrend(cpInAn, prevCpInAn, true));
  }

  // ================= OPTIONS =================
  function buildFilterOptions() {
    const branches = new Set();
    const services = new Set();
    const sources = new Set();
    const statuses = new Set();

    rawDonHang.forEach(r => {
      if (r.chi_nhanh) branches.add(String(r.chi_nhanh).trim());
      if (r.loai_dich_vu) services.add(String(r.loai_dich_vu).trim());
      if (r.nguon_khach) sources.add(String(r.nguon_khach).trim());
      const st = r.ten_trang_thai || r.trang_thai;
      if (st) statuses.add(String(st).trim());
    });

    const populate = (id, set) => {
      const el = $(id);
      el.find('option:not([value=""])').remove();
      Array.from(set).sort().forEach(val => {
        if (val) el.append(`<option value="${val}">${val}</option>`);
      });
    };

    $('#filter-branch').html('<option value="">Tất cả Chi nhánh</option>');
    populate('#filter-branch', branches);
    $('#filter-service').html('<option value="">Tất cả Loại DV</option>');
    populate('#filter-service', services);
    $('#filter-source').html('<option value="">Tất cả Nguồn</option>');
    populate('#filter-source', sources);
    $('#filter-status').html('<option value="">Tất cả Trạng thái</option>');
    populate('#filter-status', statuses);
    
    $('#filter-time').val('month');
    $('#filter-date-start').val(startDate);
    $('#filter-date-end').val(endDate);
  }

  function updateDashboard() {
    const { filteredForDash, filteredForTable, filteredLich, filteredInAn } = getFilteredData();
    const timeFilter = $('#filter-time').val() || 'month';
    const prevRange = getPreviousDateRange(dayjs(startDate), dayjs(endDate), timeFilter);
    const prevData = getFilteredData(prevRange);

    updateKPIs(filteredForDash, filteredLich, filteredInAn, prevData.filteredForDash, prevData.filteredLich, prevData.filteredInAn);
    updateCharts(filteredForDash, filteredLich, filteredInAn);
    renderTable(filteredForTable);
  }

  // ================= MAIN SYNC =================
  function fetchDataLake(isSync = false) {
    // 1. Sử dụng Client-side Cache nếu có và không phải đồng bộ cưỡng bức
    if (!isSync && window.GLOBAL_DATA_CACHE && window.GLOBAL_DATA_CACHE["DonHang"]) {
      try {
        const data = window.GLOBAL_DATA_CACHE["DonHang"];
        rawDonHang = data.don_hang || [];
        rawDonHangCt = data.don_hang_ct || [];
        rawLichCongViec = data.lich_cong_viec || [];
        rawThuChi = data.thu_chi || [];
        rawCongNoNcc = data.cong_no_ncc || [];
        
        buildFilterOptions();
        updateDashboard();
        
        if (typeof hideLoader !== 'undefined') hideLoader();
        
        // Vẫn gọi server ngầm để update cache và UI âm thầm mà không block user
        fetchDataLakeSilent();
        return;
      } catch(e) {
        console.error("Lỗi đọc cache Đơn Hàng:", e);
      }
    }

    if (isSync) {
      showLoader("Đang đồng bộ dữ liệu đơn hàng...");
    }

    google.script.run
      .withSuccessHandler(function(responseString) {
        try {
          const data = (typeof responseString === 'string') ? JSON.parse(responseString) : responseString;
          rawDonHang = data.don_hang || [];
          rawDonHangCt = data.don_hang_ct || [];
          rawLichCongViec = data.lich_cong_viec || [];
          rawThuChi = data.thu_chi || [];
          rawCongNoNcc = data.cong_no_ncc || [];
          
          // Cache data for CRUD Helper dropdown
          if (!window.GLOBAL_DATA_CACHE) window.GLOBAL_DATA_CACHE = {};
          window.GLOBAL_DATA_CACHE["DonHang"] = data;
          
          if(USER_PROFILE && USER_PROFILE.name) {
            $('#user-name-display').text(USER_PROFILE.name);
          }
          
          buildFilterOptions();
          updateDashboard();
        } catch (e) {
          console.error("Lỗi parse data:", e);
          alert("Lỗi xử lý dữ liệu từ máy chủ.");
        } finally {
          if (typeof hideLoader !== 'undefined') hideLoader();
          if (isSync) {
             $('#syncButton').find('i').removeClass('fa-spin');
             $('#syncButton').prop('disabled', false).removeClass('opacity-50');
             showSuccess("Đồng bộ dữ liệu thành công!");
          }
        }
      })
      .withFailureHandler(function(error) {
        console.error(error);
        alert("Lỗi tải dữ liệu: " + error.message);
        if (typeof hideLoader !== 'undefined') hideLoader();
        if (isSync) {
           $('#syncButton').find('i').removeClass('fa-spin');
           $('#syncButton').prop('disabled', false).removeClass('opacity-50');
        }
      })
      .MOD_DonHang_getData(JSON.stringify(USER_PROFILE));
  }

  function fetchDataLakeSilent() {
    google.script.run
      .withSuccessHandler(function(responseString) {
        try {
          const data = (typeof responseString === 'string') ? JSON.parse(responseString) : responseString;
          rawDonHang = data.don_hang || [];
          rawDonHangCt = data.don_hang_ct || [];
          rawLichCongViec = data.lich_cong_viec || [];
          rawThuChi = data.thu_chi || [];
          rawCongNoNcc = data.cong_no_ncc || [];
          
          if (!window.GLOBAL_DATA_CACHE) window.GLOBAL_DATA_CACHE = {};
          window.GLOBAL_DATA_CACHE["DonHang"] = data;
          
          buildFilterOptions();
          updateDashboard();
        } catch (e) {
          console.error("Lỗi parse data silent:", e);
        }
      })
      .MOD_DonHang_getData(JSON.stringify(USER_PROFILE));
  }

  



  // ================= CUSTOM CRUD RENDERER FOR MASTER-DETAIL-DETAIL (IsPartOf AppSheet-style) =================

  function getEnumOptionsLocal(colName, tableName) {
    if (colName === "id_khach_hang") {
      let crmData = (window.GLOBAL_DATA_CACHE && window.GLOBAL_DATA_CACHE["CRM"]) || {};
      if (typeof crmData === "string") {
        try { crmData = JSON.parse(crmData); } catch(e) { crmData = {}; }
      }
      const customers = crmData.customers || [];
      return customers.map(c => ({ value: c.id_khach_hang, label: c.ten_khach_hang || c.id_khach_hang }));
    }
    if (colName === "NV_sale_on" || colName === "NV_sale_off") {
      let nvData = (window.GLOBAL_DATA_CACHE && window.GLOBAL_DATA_CACHE["NhanVien"]) || {};
      if (typeof nvData === "string") {
        try { nvData = JSON.parse(nvData); } catch(e) { nvData = {}; }
      }
      const employees = nvData.employees || [];
      return employees.map(emp => ({ value: emp.id_nhan_vien, label: emp.ho_va_ten || emp.id_nhan_vien }));
    }
    
    // Delegate back to global AppCRUD for generic options (chi_nhanh, trang_thai, etc)
    if (window.AppCRUD && typeof window.AppCRUD.getEnumOptions === 'function') {
      return window.AppCRUD.getEnumOptions(colName, tableName);
    }
    
    return [];
  }

  function customRenderForm(recordObj) {
    const fieldsContainer = $('#crud-modal-fields');
    fieldsContainer.empty();
    
    // 1. Tạo Tabs Selector
    const tabHeader = `<div class="col-span-full flex border-b border-slate-200 dark:border-slate-800 mb-4 gap-2">
      <button type="button" class="tab-form-btn px-4 py-2 border-b-2 font-bold text-xs transition-all active border-blue-500 text-blue-600 dark:text-blue-400" data-form-tab="form-tab-donhang">
        <i class="fa-solid fa-file-lines mr-1"></i> 1. Thông tin đơn hàng
      </button>
      <button type="button" class="tab-form-btn px-4 py-2 border-b-2 font-bold text-xs transition-all border-transparent text-slate-400 hover:text-slate-650 dark:hover:text-slate-200" data-form-tab="form-tab-dichvu">
        <i class="fa-solid fa-gem mr-1"></i> 2. Chi tiết đơn hàng
      </button>
      <button type="button" class="tab-form-btn px-4 py-2 border-b-2 font-bold text-xs transition-all border-transparent text-slate-400 hover:text-slate-650 dark:hover:text-slate-200" data-form-tab="form-tab-thuchi">
        <i class="fa-solid fa-credit-card mr-1"></i> 3. Thanh toán
      </button>
    </div>`;
    fieldsContainer.append(tabHeader);
    
    const tab1 = $('<div id="form-tab-donhang" class="form-tab-content grid grid-cols-1 md:grid-cols-2 gap-4 col-span-full"></div>');
    const tab2 = $('<div id="form-tab-dichvu" class="form-tab-content col-span-full hidden space-y-4"></div>');
    const tab3 = $('<div id="form-tab-thuchi" class="form-tab-content grid grid-cols-1 md:grid-cols-2 gap-4 col-span-full hidden"></div>');
    
    fieldsContainer.append(tab1).append(tab2).append(tab3);
    
    // Sự kiện chuyển tab
    $(document).off('click', '.tab-form-btn').on('click', '.tab-form-btn', function() {
      $('.tab-form-btn').removeClass('active border-blue-500 text-blue-600 dark:text-blue-400').addClass('border-transparent text-slate-400');
      $(this).removeClass('border-transparent text-slate-400').addClass('active border-blue-500 text-blue-600 dark:text-blue-400');
      
      const targetTab = $(this).data('form-tab');
      $('.form-tab-content').addClass('hidden');
      $('#' + targetTab).removeClass('hidden');
    });

    // Helper functions cho Form Tab 1
    const buildSelect = (colName, labelText, currentVal, required = false) => {
      const options = getEnumOptionsLocal(colName, "don_hang");
      let optHtml = `<option value="">-- Chọn ${labelText} --</option>`;
      options.forEach(opt => {
        let val = opt && typeof opt === 'object' ? opt.value : opt;
        let lbl = opt && typeof opt === 'object' ? opt.label : opt;
        optHtml += `<option value="${val}" ${String(currentVal) === String(val) ? 'selected' : ''}>${lbl}</option>`;
      });
      return `<div class="flex flex-col space-y-1.5 form-field-${colName}">
        <label class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">${labelText}${required ? ' <span class="text-rose-500">*</span>' : ''}</label>
        <select name="${colName}" ${required ? 'required' : ''} class="px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl text-sm dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20">${optHtml}</select>
      </div>`;
    };

    const buildInput = (colName, labelText, currentVal, type = "text", required = false, readonly = false) => {
      let extraClass = readonly ? "bg-slate-100 dark:bg-slate-800 text-slate-450 outline-none select-none" : "bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500/20";
      let formattedVal = currentVal;
      if (type === "date" && currentVal) {
        if (/^\d{4}-\d{2}-\d{2}$/.test(currentVal)) {
          formattedVal = currentVal;
        } else {
          const dObj = new Date(currentVal);
          if (!isNaN(dObj.getTime())) {
            const y = dObj.getFullYear();
            const m = String(dObj.getMonth() + 1).padStart(2, '0');
            const d = String(dObj.getDate()).padStart(2, '0');
            formattedVal = `${y}-${m}-${d}`;
          }
        }
      }
      return `<div class="flex flex-col space-y-1.5 form-field-${colName}">
        <label class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">${labelText}${required ? ' <span class="text-rose-500">*</span>' : ''}</label>
        <input type="${type}" name="${colName}" value="${formattedVal || ''}" ${required ? 'required' : ''} ${readonly ? 'readonly' : ''} class="px-3.5 py-2.5 border border-slate-200 dark:border-slate-700/50 rounded-xl text-sm dark:text-white ${extraClass}">
      </div>`;
    };

    const buildTextarea = (colName, labelText, currentVal, readonly = false, required = false) => {
      let extraClass = readonly ? "bg-slate-100 dark:bg-slate-800 text-slate-450 outline-none select-none" : "bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500/20";
      return `<div class="flex flex-col space-y-1.5 md:col-span-2 form-field-${colName}">
        <label class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">${labelText}${required ? ' <span class="text-rose-500">*</span>' : ''}</label>
        <textarea name="${colName}" rows="3" ${required ? 'required' : ''} ${readonly ? 'readonly' : ''} class="px-3.5 py-2.5 border border-slate-200 dark:border-slate-700/50 rounded-xl text-sm dark:text-white ${extraClass}">${currentVal || ''}</textarea>
      </div>`;
    };

    const buildCheckboxGroup = (colName, labelText, currentVal) => {
      const options = getEnumOptionsLocal(colName, "don_hang");
      const selectedVals = String(currentVal || "").split(',').map(v => v.trim()).filter(v => v);
      let optHtml = `<div class="p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl space-y-2 max-h-48 overflow-y-auto">`;
      options.forEach(opt => {
        let val = opt && typeof opt === 'object' ? opt.value : opt;
        let lbl = opt && typeof opt === 'object' ? opt.label : opt;
        const isChecked = selectedVals.includes(String(val)) ? "checked" : "";
        optHtml += `<label class="flex items-center gap-2.5 text-xs dark:text-white cursor-pointer select-none hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-lg px-2 py-1">
          <input type="checkbox" name="${colName}_checkbox" value="${val}" ${isChecked} class="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 flex-shrink-0">
          <span class="truncate">${lbl}</span>
        </label>`;
      });
      optHtml += `<input type="hidden" id="form-hidden-${colName}" name="${colName}" value="${currentVal || ''}">`;
      optHtml += `</div>`;

      $(document).off('change', `input[name="${colName}_checkbox"]`).on('change', `input[name="${colName}_checkbox"]`, function() {
        const vals = [];
        $(`input[name="${colName}_checkbox"]:checked`).each(function() {
          vals.push($(this).val());
        });
        $(`#form-hidden-${colName}`).val(vals.join(', '));
      });

      return `<div class="flex flex-col space-y-1.5 md:col-span-2 form-field-${colName}">
        <label class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">${labelText}</label>
        ${optHtml}
      </div>`;
    };

    // 2. RENDER TAB 1: THÔNG TIN ĐƠN HÀNG (Hiển thị đầy đủ 100% cột trong schema)
    tab1.append(buildInput("id_don_hang", "Mã Đơn Hàng", recordObj.id_don_hang, "text", false, true));
    tab1.append(buildInput("ngay", "Ngày Lập Đơn Hàng", recordObj.ngay || new Date(), "date", true));
    tab1.append(buildSelect("id_khach_hang", "Khách Hàng", recordObj.id_khach_hang, true));
    tab1.append(buildInput("ten_khach_hang", "Tên Khách Hàng", recordObj.ten_khach_hang));
    tab1.append(buildInput("so_cccd", "Số CCCD", recordObj.so_cccd));
    tab1.append(buildInput("so_dien_thoai", "Số Điện Thoại", recordObj.so_dien_thoai));
    tab1.append(buildInput("dia_chi", "Địa Chỉ", recordObj.dia_chi));
    tab1.append(buildInput("ten_co_dau", "Tên Cô Dâu", recordObj.ten_co_dau));
    tab1.append(buildInput("ten_chu_re", "Tên Chú Rể", recordObj.ten_chu_re));
    tab1.append(buildSelect("chi_nhanh", "Chi Nhánh", recordObj.chi_nhanh, true));
    tab1.append(buildSelect("loai_dich_vu", "Loại Dịch Vụ", recordObj.loai_dich_vu));
    tab1.append(buildSelect("trang_thai", "Trạng Thái", recordObj.trang_thai, true));
    tab1.append(buildInput("ngay_hop_dong", "Ngày Hợp Đồng", recordObj.ngay_hop_dong, "date"));
    tab1.append(buildSelect("NV_sale_on", "NV Sale Online", recordObj.NV_sale_on));
    tab1.append(buildSelect("NV_sale_off", "NV Sale Offline", recordObj.NV_sale_off));
    tab1.append(buildSelect("nguon_khach", "Nguồn Khách", recordObj.nguon_khach));
    tab1.append(buildSelect("nhom_khach", "Nhóm Khách", recordObj.nhom_khach));
    
    tab1.append(buildInput("link_nhom_zalo", "Link nhóm Zalo", recordObj.link_nhom_zalo, "text"));
    tab1.append(buildInput("link_anh_goc", "Link ảnh gốc", recordObj.link_anh_goc, "text"));
    tab1.append(buildInput("ngay_chup", "Ngày Chụp", recordObj.ngay_chup, "date"));
    tab1.append(buildInput("thoi_gian_bat_dau", "Thời Gian Bắt Đầu", recordObj.thoi_gian_bat_dau));
    tab1.append(buildSelect("dia_diem", "Địa Điểm chụp", recordObj.dia_diem));
    tab1.append(buildInput("ngay_cuoi", "Ngày Cưới", recordObj.ngay_cuoi, "date"));
    tab1.append(buildInput("ngay_hoan_thanh", "Ngày Hoàn Thành", recordObj.ngay_hoan_thanh, "date"));
    
    tab1.append(buildInput("chi_phi_cost", "Chi Phí Cost", recordObj.chi_phi_cost, "number"));
    tab1.append(buildInput("loi_nhuan_thuan", "Lợi Nhuận Thuần", recordObj.loi_nhuan_thuan, "number", false, true));
    tab1.append(buildInput("doanh_so_on", "Doanh Số Online", recordObj.doanh_so_on, "number"));
    tab1.append(buildInput("doanh_so_off", "Doanh Số Offline", recordObj.doanh_so_off, "number"));
    tab1.append(buildInput("luong_ki_on", "Lương Kỳ Online", recordObj.luong_ki_on, "number"));
    tab1.append(buildInput("luong_ki_off", "Lương Kỳ Offline", recordObj.luong_ki_off, "number"));
    
    // CỘT THIẾU CỦA ĐƠN HÀNG TRÊN TAB 1
    tab1.append(buildCheckboxGroup("id_dich_vu", "Dịch vụ quan tâm (id_dich_vu)", recordObj.id_dich_vu));
    tab1.append(buildInput("file_hd_dich_vu", "File HĐ Dịch Vụ", recordObj.file_hd_dich_vu, "text"));
    tab1.append(buildInput("file_hd_trang_phuc", "File HĐ Trang Phục", recordObj.file_hd_trang_phuc, "text"));
    tab1.append(buildTextarea("lich_su_cap_nhat", "Lịch Sử Cập Nhật", recordObj.lich_su_cap_nhat, true));

    tab1.append(buildInput("ly_do_khach_hang_khong_ky", "Lý Do Không Ký", recordObj.ly_do_khach_hang_khong_ky));
    tab1.append(buildTextarea("ghi_chu", "Ghi Chú", recordObj.ghi_chu));

    // Quy tắc ẩn hiện Show_If Tab 1
    function applyFormShowIf() {
      const trangThai = $('select[name="trang_thai"]').val();
      const lyDoField = $('.form-field-ly_do_khach_hang_khong_ky');
      if (trangThai === "Không ký" || trangThai === "HD07" || trangThai === "Quy trình không ký") {
        lyDoField.removeClass('hidden');
      } else {
        lyDoField.addClass('hidden');
        $('input[name="ly_do_khach_hang_khong_ky"]').val('');
      }

      const loaiDV = $('select[name="loai_dich_vu"]').val() || '';
      const isChupAnh = loaiDV.toLowerCase().includes("chụp") || loaiDV.toLowerCase().includes("trọn gói") || loaiDV === '';
      const chupFields = $('.form-field-ngay_chup, .form-field-thoi_gian_bat_dau, .form-field-dia_diem');
      const cuoiFields = $('.form-field-ngay_cuoi');
      if (isChupAnh) {
        chupFields.removeClass('hidden');
        cuoiFields.removeClass('hidden');
      } else {
        chupFields.addClass('hidden');
        cuoiFields.addClass('hidden');
      }
    }

    $(document).off('change', 'select[name="trang_thai"], select[name="loai_dich_vu"]').on('change', 'select[name="trang_thai"], select[name="loai_dich_vu"]', function() {
      applyFormShowIf();
    });

    // Sự kiện tự động điền thông tin khi chọn khách hàng
    $(document).off('change', 'select[name="id_khach_hang"]').on('change', 'select[name="id_khach_hang"]', function() {
      const custId = $(this).val();
      if (!custId) return;
      let crmData = (window.GLOBAL_DATA_CACHE && window.GLOBAL_DATA_CACHE["CRM"]) || {};
      if (typeof crmData === "string") { try { crmData = JSON.parse(crmData); } catch(e) { crmData = {}; } }
      const customers = crmData.customers || [];
      const cust = customers.find(c => String(c.id_khach_hang).trim() === String(custId).trim());
      if (cust) {
        $('input[name="ten_khach_hang"]').val(cust.ten_khach_hang || '');
        $('input[name="so_dien_thoai"]').val(cust.so_dien_thoai || '');
        $('input[name="dia_chi"]').val(cust.dia_chi || '');
        $('input[name="ten_co_dau"]').val(cust.ten_co_dau || '');
        $('input[name="ten_chu_re"]').val(cust.ten_chu_re || '');
        $('input[name="so_cccd"]').val(cust.so_cccd || '');
      }
    });

    // 3. RENDER TAB 2: CHI TIẾT ĐƠN HÀNG (Hiển thị đầy đủ cột trong schema của don_hang_ct)
    let crmData = (window.GLOBAL_DATA_CACHE && window.GLOBAL_DATA_CACHE["CRM"]) || {};
    if (typeof crmData === "string") { try { crmData = JSON.parse(crmData); } catch(e) {} }
    const servicesList = crmData.services || [];
    
    let tpData = (window.GLOBAL_DATA_CACHE && window.GLOBAL_DATA_CACHE["TrangPhuc"]) || {};
    if (typeof tpData === "string") { try { tpData = JSON.parse(tpData); } catch(e) {} }
    const costumesList = tpData.trangPhucData || tpData || [];

    let costumeOptsHtml = '<option value="">-- Chọn Trang Phục --</option>';
    costumesList.forEach(item => {
      let displayName = item.ten_trang_phuc || item.nhan_trang_phuc || item.id_trang_phuc;
      const rawLabel = item.nhan_trang_phuc || '';
      const nameParts = rawLabel.split(' ');
      if (nameParts.length > 1 && /^TP-\d+$/i.test(nameParts[0])) {
        displayName = nameParts.slice(1).join(' ');
      }
      costumeOptsHtml += `<option value="${item.id_trang_phuc}">${displayName}</option>`;
    });

    let serviceOptsHtml = '<option value="">-- Chọn Dịch Vụ/Sản phẩm --</option>';
    servicesList.forEach(item => {
      serviceOptsHtml += `<option value="${item.id_dich_vu}">${item.ten_dich_vu}</option>`;
    });

    const accordionStyles = `
      <style>
        .accordion-item {
          transition: all 0.2s ease-in-out;
        }
        .accordion-item.active {
          border-color: #3b82f6;
          box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.08), 0 2px 4px -1px rgba(59, 130, 246, 0.04);
        }
        .accordion-body.hidden {
          display: none;
        }
      </style>
    `;
    if (!$('#accordion-custom-styles').length) {
      $('head').append(`<div id="accordion-custom-styles">${accordionStyles}</div>`);
    }

    const detailContainer = $('<div id="form-details-accordion-container" class="space-y-3 col-span-full"></div>');
    tab2.append(detailContainer);
    tab2.append(`
      <div class="col-span-full">
        <button type="button" id="btn-form-add-detail" class="px-3.5 py-2 flex items-center gap-1.5 rounded-xl bg-blue-500/10 text-blue-500 hover:bg-blue-600 hover:text-white transition-all text-xs font-semibold cursor-pointer mt-2">
          <i class="fa-solid fa-plus text-[10px]"></i> Thêm sản phẩm/dịch vụ
        </button>
      </div>
    `);

    // Helper options cho các đợt detail
    const branchList = getEnumOptionsLocal("chi_nhanh", "don_hang_ct");
    let branchOptsHtml = '<option value="">-- Chọn Chi Nhánh --</option>';
    branchList.forEach(opt => {
      let val = opt && typeof opt === 'object' ? opt.value : opt;
      let lbl = opt && typeof opt === 'object' ? opt.label : opt;
      branchOptsHtml += `<option value="${val}">${lbl}</option>`;
    });

    const statusList = getEnumOptionsLocal("trang_thai", "don_hang_ct");
    let statusOptsHtml = '<option value="">-- Chọn Trạng Thái --</option>';
    statusList.forEach(opt => {
      let val = opt && typeof opt === 'object' ? opt.value : opt;
      let lbl = opt && typeof opt === 'object' ? opt.label : opt;
      statusOptsHtml += `<option value="${val}">${lbl}</option>`;
    });

    const salesOffList = getEnumOptionsLocal("NV_sale_off", "don_hang_ct");
    let salesOffOptsHtml = '<option value="">-- Chọn NV Sale Off --</option>';
    salesOffList.forEach(opt => {
      let val = opt && typeof opt === 'object' ? opt.value : opt;
      let lbl = opt && typeof opt === 'object' ? opt.label : opt;
      salesOffOptsHtml += `<option value="${val}">${lbl}</option>`;
    });

    const bomList = getEnumOptionsLocal("list_BOM", "don_hang_ct");
    let bomOptsHtml = '';
    bomList.forEach(opt => {
      let val = opt && typeof opt === 'object' ? opt.value : opt;
      let lbl = opt && typeof opt === 'object' ? opt.label : opt;
      bomOptsHtml += `<option value="${val}">${lbl}</option>`;
    });

    function addDetailRow(data = {}, idx) {
      const isActive = idx === 0 ? "active" : "";
      const bodyHidden = idx === 0 ? "" : "hidden";
      const chevronIcon = idx === 0 ? "fa-chevron-up" : "fa-chevron-down";
      
      let summaryText = `Dòng #${idx + 1}: `;
      if (data.id_dich_vu) {
        const sObj = servicesList.find(s => String(s.id_dich_vu).trim() === String(data.id_dich_vu).trim());
        summaryText += sObj ? sObj.ten_dich_vu : data.ten_dich_vu || data.id_dich_vu;
      } else if (data.id_trang_phuc) {
        const tObj = costumesList.find(t => String(t.id_trang_phuc).trim() === String(data.id_trang_phuc).trim());
        summaryText += tObj ? (tObj.ten_trang_phuc || tObj.nhan_trang_phuc || tObj.id_trang_phuc) : data.id_trang_phuc;
      } else {
        summaryText += "[Chưa chọn dịch vụ/sản phẩm]";
      }

      const qty = data.so_luong || 1;
      const price = data.don_gia || 0;
      const discount = data.so_tien_km || 0;
      const subtotal = (qty * price) - discount;
      const formattedSubtotal = new Intl.NumberFormat('vi-VN').format(subtotal) + ' đ';

      // Định dạng ngày
      const formatDateForInput = (val) => {
        if (!val) return '';
        if (/^\d{4}-\d{2}-\d{2}$/.test(val)) return val;
        const dObj = new Date(val);
        if (!isNaN(dObj.getTime())) {
          const y = dObj.getFullYear();
          const m = String(dObj.getMonth() + 1).padStart(2, '0');
          const d = String(dObj.getDate()).padStart(2, '0');
          return `${y}-${m}-${d}`;
        }
        return '';
      };

      const selectedBOMs = String(data.list_BOM || '').split(',').map(v => v.trim()).filter(v => v);

      const rowHtml = `
        <div class="accordion-item detail-row bg-slate-50/50 dark:bg-slate-900/10 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 transition-all ${isActive}" data-index="${idx}">
          <!-- Header (Master Summary) -->
          <div class="accordion-header flex items-center justify-between cursor-pointer select-none">
            <div class="flex items-center gap-3 w-3/4">
              <i class="fa-solid ${chevronIcon} text-slate-400 text-xs toggle-icon"></i>
              <span class="font-bold text-xs text-slate-700 dark:text-slate-200 label-summary truncate">${summaryText}</span>
              <span class="badge-qty bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[10px] text-slate-500 font-bold">SL: ${qty}</span>
              <span class="badge-subtotal bg-blue-50 dark:bg-blue-950/30 px-2 py-0.5 rounded text-[10px] text-blue-600 dark:text-blue-400 font-bold">${formattedSubtotal}</span>
            </div>
            <div class="flex items-center gap-2">
              <button type="button" class="btn-remove-row text-slate-400 hover:text-red-500 rounded p-1 transition-colors cursor-pointer animate-none" title="Xóa dòng này">
                <i class="fa-solid fa-trash-can text-sm"></i>
              </button>
            </div>
          </div>

          <!-- Body (Hiển thị đầy đủ cột trong schema của don_hang_ct) -->
          <div class="accordion-body grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-4 mt-3 border-t border-slate-100 dark:border-slate-800/60 ${bodyHidden}">
            <input type="hidden" name="details[${idx}][id_don_hang_ct]" value="${data.id_don_hang_ct || ''}">
            <input type="hidden" name="details[${idx}][id_don_hang]" value="${data.id_don_hang || recordObj.id_don_hang || ''}">
            
            <!-- Hạng mục (Dịch vụ, Trang phục, Phụ kiện, Khác) -->
            <div class="flex flex-col space-y-1">
              <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Hạng mục <span class="text-rose-500">*</span></label>
              <select name="details[${idx}][hang_muc]" required class="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg text-xs dark:text-white outline-none select-category">
                <option value="Dịch vụ" ${data.hang_muc === 'Dịch vụ' || !data.hang_muc ? 'selected' : ''}>Dịch vụ</option>
                <option value="Trang phục" ${data.hang_muc === 'Trang phục' ? 'selected' : ''}>Trang phục</option>
                <option value="Phụ kiện" ${data.hang_muc === 'Phụ kiện' ? 'selected' : ''}>Phụ kiện</option>
                <option value="Khác" ${data.hang_muc === 'Khác' ? 'selected' : ''}>Khác</option>
              </select>
            </div>

            <!-- Chi nhánh (Required) -->
            <div class="flex flex-col space-y-1">
              <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Chi nhánh <span class="text-rose-500">*</span></label>
              <select name="details[${idx}][chi_nhanh]" required class="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg text-xs dark:text-white outline-none">
                ${branchOptsHtml.replace(`value="${data.chi_nhanh || recordObj.chi_nhanh || ''}"`, `value="${data.chi_nhanh || recordObj.chi_nhanh || ''}" selected`)}
              </select>
            </div>

            <!-- Dropdown Dịch vụ (Chỉ hiện khi Hạng mục = Dịch vụ) -->
            <div class="flex flex-col space-y-1 group-service-${idx}">
              <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Sản phẩm / Dịch vụ <span class="text-rose-500">*</span></label>
              <select name="details[${idx}][id_dich_vu]" class="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg text-xs dark:text-white outline-none select-service">
                ${serviceOptsHtml.replace(`value="${data.id_dich_vu}"`, `value="${data.id_dich_vu}" selected`)}
              </select>
            </div>

            <!-- Dropdown Trang phục (Chỉ hiện khi Hạng mục = Trang phục hoặc Phụ kiện) -->
            <div class="flex flex-col space-y-1 group-costume-${idx} hidden">
              <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Chọn Trang Phục <span class="text-rose-500">*</span></label>
              <select name="details[${idx}][id_trang_phuc]" class="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg text-xs dark:text-white outline-none select-costume">
                ${costumeOptsHtml.replace(`value="${data.id_trang_phuc}"`, `value="${data.id_trang_phuc}" selected`)}
              </select>
            </div>

            <!-- Tên dịch vụ hiển thị (Readonly) -->
            <input type="hidden" name="details[${idx}][ten_dich_vu]" value="${data.ten_dich_vu || ''}" class="input-service-name">

            <!-- Loại dịch vụ (loai_dich_vu - Readonly) -->
            <div class="flex flex-col space-y-1">
              <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Loại dịch vụ</label>
              <input type="text" name="details[${idx}][loai_dich_vu]" value="${data.loai_dich_vu || ''}" readonly class="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg text-xs dark:text-slate-400 outline-none input-loai-dv">
            </div>

            <!-- Phân loại (phan_loai - Readonly) -->
            <div class="flex flex-col space-y-1">
              <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Phân loại</label>
              <input type="text" name="details[${idx}][phan_loai]" value="${data.phan_loai || ''}" readonly class="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg text-xs dark:text-slate-400 outline-none input-phan-loai">
            </div>

            <!-- Số lượng (Required) -->
            <div class="flex flex-col space-y-1">
              <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Số lượng <span class="text-rose-500">*</span></label>
              <input type="number" name="details[${idx}][so_luong]" value="${qty}" min="1" required class="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg text-xs dark:text-white outline-none input-qty">
            </div>

            <!-- Đơn giá (Required) -->
            <div class="flex flex-col space-y-1">
              <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Đơn giá <span class="text-rose-500">*</span></label>
              <input type="number" name="details[${idx}][don_gia]" value="${price}" min="0" required class="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg text-xs dark:text-white outline-none input-price">
            </div>

            <!-- Thành tiền (Readonly) -->
            <div class="flex flex-col space-y-1">
              <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Thành tiền</label>
              <input type="number" name="details[${idx}][thanh_tien]" value="${qty * price}" readonly class="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg text-xs dark:text-slate-400 outline-none input-line-thanhtien">
            </div>

            <!-- Số tiền Khuyến mãi -->
            <div class="flex flex-col space-y-1">
              <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Số tiền KM</label>
              <input type="number" name="details[${idx}][so_tien_km]" value="${discount}" min="0" class="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg text-xs dark:text-white outline-none input-discount">
            </div>

            <!-- Nội dung KM (loai_khuyen_mai) -->
            <div class="flex flex-col space-y-1">
              <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Nội dung khuyến mãi</label>
              <input type="text" name="details[${idx}][loai_khuyen_mai]" value="${data.loai_khuyen_mai || ''}" class="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg text-xs dark:text-white outline-none">
            </div>

            <!-- Tổng tiền sau KM (tong_tien - Readonly) -->
            <div class="flex flex-col space-y-1">
              <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tổng tiền</label>
              <input type="number" name="details[${idx}][tong_tien]" value="${subtotal}" readonly class="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg text-xs dark:text-slate-400 outline-none input-line-subtotal">
            </div>

            <!-- Số tiền Cọc (so_tien_coc) -->
            <div class="flex flex-col space-y-1">
              <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Số tiền đặt cọc</label>
              <input type="number" name="details[${idx}][so_tien_coc]" value="${data.so_tien_coc || 0}" min="0" class="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg text-xs dark:text-white outline-none">
            </div>

            <!-- Ngày lấy (ngay_lay) -->
            <div class="flex flex-col space-y-1">
              <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Ngày lấy</label>
              <input type="date" name="details[${idx}][ngay_lay]" value="${formatDateForInput(data.ngay_lay)}" class="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg text-xs dark:text-white outline-none">
            </div>

            <!-- Ngày trả (ngay_tra) -->
            <div class="flex flex-col space-y-1">
              <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Ngày trả</label>
              <input type="date" name="details[${idx}][ngay_tra]" value="${formatDateForInput(data.ngay_tra)}" class="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg text-xs dark:text-white outline-none">
            </div>

            <!-- Trạng thái quy trình (trang_thai) -->
            <div class="flex flex-col space-y-1">
              <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Trạng thái dòng</label>
              <select name="details[${idx}][trang_thai]" class="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg text-xs dark:text-white outline-none">
                ${statusOptsHtml.replace(`value="${data.trang_thai || ''}"`, `value="${data.trang_thai || ''}" selected`)}
              </select>
            </div>

            <!-- Nhân viên Sale Off (NV_sale_off) -->
            <div class="flex flex-col space-y-1">
              <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">NV Sale Off</label>
              <select name="details[${idx}][NV_sale_off]" class="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg text-xs dark:text-white outline-none">
                ${salesOffOptsHtml.replace(`value="${data.NV_sale_off || ''}"`, `value="${data.NV_sale_off || ''}" selected`)}
              </select>
            </div>

            <!-- Phụ kiện đi kèm (list_BOM - Đa chọn) -->
            <div class="flex flex-col space-y-1">
              <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Phụ kiện kèm theo (BOM)</label>
              <div class="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg max-h-36 overflow-y-auto space-y-1">
                ${bomList.map((opt, bIdx) => {
                  let val = opt && typeof opt === 'object' ? opt.value : opt;
                  let lbl = opt && typeof opt === 'object' ? opt.label : opt;
                  const isChecked = selectedBOMs.includes(String(val)) ? 'checked' : '';
                  return `<label class="flex items-center gap-2 text-[11px] cursor-pointer">
                    <input type="checkbox" name="details[${idx}][list_BOM]_checkbox" value="${val}" ${isChecked} class="w-3.5 h-3.5 rounded border-slate-300">
                    <span>${lbl}</span>
                  </label>`;
                }).join('')}
                <input type="hidden" id="detail-bom-hidden-${idx}" name="details[${idx}][list_BOM]" value="${data.list_BOM || ''}">
              </div>
            </div>

            <!-- Chi tiết (chi_tiet) -->
            <div class="flex flex-col space-y-1 md:col-span-2">
              <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Mô tả sản phẩm (BOM Detail / chi_tiet)</label>
              <textarea name="details[${idx}][chi_tiet]" rows="3" class="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg text-xs dark:text-white outline-none textarea-bom-detail">${data.chi_tiet || ''}</textarea>
            </div>

            <!-- Ghi chú (ghi_chu) -->
            <div class="flex flex-col space-y-1 md:col-span-2">
              <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Ghi chú dòng chi tiết</label>
              <textarea name="details[${idx}][ghi_chu]" rows="2" class="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg text-xs dark:text-white outline-none">${data.ghi_chu || ''}</textarea>
            </div>
          </div>
        </div>
      `;
      $('#form-details-accordion-container').append(rowHtml);
      
      const $row = $('#form-details-accordion-container').find(`.detail-row[data-index="${idx}"]`);
      
      // Khởi chạy quy tắc ẩn hiện dropdown Dịch vụ/Trang phục
      updateDetailRowFields($row, idx);

      // Cập nhật list_BOM khi checkbox thay đổi
      $(document).off('change', `input[name="details[${idx}][list_BOM]_checkbox"]`).on('change', `input[name="details[${idx}][list_BOM]_checkbox"]`, function() {
        const vals = [];
        $(`input[name="details[${idx}][list_BOM]_checkbox"]:checked`).each(function() {
          vals.push($(this).val());
        });
        $(`#detail-bom-hidden-${idx}`).val(vals.join(', '));
      });
    }

    // Thiết lập hàm kiểm tra ẩn hiện dropdown động theo Hạng mục
    function updateDetailRowFields($row, idx) {
      const cat = $row.find('.select-category').val();
      const $serviceGroup = $row.find(`.group-service-${idx}`);
      const $costumeGroup = $row.find(`.group-costume-${idx}`);
      const $serviceSelect = $row.find('.select-service');
      const $costumeSelect = $row.find('.select-costume');

      if (cat === "Dịch vụ") {
        $serviceGroup.removeClass('hidden');
        $serviceSelect.attr('required', 'required');
        $costumeGroup.addClass('hidden');
        $costumeSelect.removeAttr('required').val('');
      } else if (cat === "Trang phục" || cat === "Phụ kiện") {
        $costumeGroup.removeClass('hidden');
        $costumeSelect.attr('required', 'required');
        $serviceGroup.addClass('hidden');
        $serviceSelect.removeAttr('required').val('');
      } else {
        $serviceGroup.addClass('hidden');
        $serviceSelect.removeAttr('required').val('');
        $costumeGroup.addClass('hidden');
        $costumeSelect.removeAttr('required').val('');
      }
    }

    // Lắng nghe sự kiện đổi Hạng mục
    $(document).off('change', '.select-category').on('change', '.select-category', function() {
      const $row = $(this).closest('.detail-row');
      const idx = parseInt($row.attr('data-index'), 10);
      updateDetailRowFields($row, idx);
      
      // Xóa các dữ liệu cũ
      $row.find('.select-service').val('');
      $row.find('.select-costume').val('');
      $row.find('.input-price').val(0);
      $row.find('.input-service-name').val('');
      $row.find('.input-loai-dv').val('');
      $row.find('.input-phan-loai').val('');
      $row.find('.textarea-bom-detail').val('');
      recalculateFormFinancials();
    });

    // Lắng nghe sự kiện chọn Dịch vụ
    $(document).off('change', '.select-service').on('change', '.select-service', function() {
      const $row = $(this).closest('.detail-row');
      const sId = $(this).val();
      if (sId) {
        const sObj = servicesList.find(s => String(s.id_dich_vu).trim() === String(sId).trim());
        if (sObj) {
          $row.find('.input-price').val(parseAmount(sObj.don_gia));
          $row.find('.input-service-name').val(sObj.ten_dich_vu);
          $row.find('.input-loai-dv').val(sObj.loai_dich_vu || '');
          $row.find('.input-phan-loai').val(sObj.loai_dich_vu || '');
          $row.find('.textarea-bom-detail').val(sObj.mo_ta_chi_tiet || '');
        }
      } else {
        $row.find('.input-service-name').val('');
        $row.find('.input-price').val(0);
      }
      recalculateFormFinancials();
    });

    // Lắng nghe sự kiện chọn Trang phục
    $(document).off('change', '.select-costume').on('change', '.select-costume', function() {
      const $row = $(this).closest('.detail-row');
      const tId = $(this).val();
      if (tId) {
        const tObj = costumesList.find(t => String(t.id_trang_phuc).trim() === String(tId).trim());
        if (tObj) {
          $row.find('.input-price').val(parseAmount(tObj.gia_nhap || 0)); // Fallback gia_nhap
          $row.find('.input-service-name').val(tObj.ten_trang_phuc || tObj.nhan_trang_phuc || tId);
          $row.find('.input-loai-dv').val('Trang phục');
          $row.find('.input-phan-loai').val(tObj.loai_trang_phuc || '');
        }
      } else {
        $row.find('.input-service-name').val('');
        $row.find('.input-price').val(0);
      }
      recalculateFormFinancials();
    });

    // Nạp chi tiết cũ (nếu có)
    const ctList = window.AppCRUD.isEdit ? rawDonHangCt.filter(r => String(r.id_don_hang).trim() === String(recordObj.id_don_hang).trim()) : [];
    if (ctList.length === 0) {
      addDetailRow({}, 0);
    } else {
      ctList.forEach((item, index) => {
        addDetailRow(item, index);
      });
    }

    // Sự kiện Thêm dòng chi tiết
    $('#btn-form-add-detail').off('click').on('click', function() {
      const nextIdx = $('#form-details-accordion-container .detail-row').length;
      addDetailRow({}, nextIdx);
    });

    // Lắng nghe sửa đổi ở Chi tiết
    $(document).off('input change', '.detail-row input, .detail-row select').on('input change', '.detail-row input, .detail-row select', function(e) {
      if ($(e.target).hasClass('input-line-subtotal') || $(e.target).hasClass('input-line-thanhtien')) return;
      const $row = $(this).closest('.detail-row');
      const idx = parseInt($row.attr('data-index'), 10);
      
      // Tính toán subtotal dòng
      const qty = parseFloat($row.find('.input-qty').val()) || 1;
      const price = parseFloat($row.find('.input-price').val()) || 0;
      const discount = parseFloat($row.find('.input-discount').val()) || 0;
      const lineTotal = qty * price;
      const lineSubtotal = lineTotal - discount;
      
      $row.find('.input-line-thanhtien').val(lineTotal);
      $row.find('.input-line-subtotal').val(lineSubtotal);

      // Cập nhật nhãn Summary Header
      const sId = $row.find('.select-service').val();
      const tId = $row.find('.select-costume').val();
      let nameText = "";
      if (sId) {
        const sObj = servicesList.find(s => String(s.id_dich_vu).trim() === String(sId).trim());
        nameText = sObj ? sObj.ten_dich_vu : sId;
      } else if (tId) {
        const tObj = costumesList.find(t => String(t.id_trang_phuc).trim() === String(tId).trim());
        nameText = tObj ? (tObj.ten_trang_phuc || tObj.nhan_trang_phuc || tObj.id_trang_phuc) : tId;
      } else {
        nameText = "[Chưa chọn dịch vụ/sản phẩm]";
      }

      const formattedSubtotal = new Intl.NumberFormat('vi-VN').format(lineSubtotal) + ' đ';
      $row.find('.label-summary').text(`Dòng #${idx + 1}: ${nameText}`);
      $row.find('.badge-qty').text(`SL: ${qty}`);
      $row.find('.badge-subtotal').text(formattedSubtotal);

      recalculateFormFinancials();
    });

    // Xóa dòng chi tiết
    $(document).off('click', '.detail-row .btn-remove-row').on('click', '.detail-row .btn-remove-row', function(e) {
      e.stopPropagation();
      const $container = $('#form-details-accordion-container');
      if ($container.children('.detail-row').length > 1) {
        $(this).closest('.detail-row').remove();
        $container.children('.detail-row').each(function(idx) {
          $(this).attr('data-index', idx);
          const summarySpan = $(this).find('.label-summary');
          const oldText = summarySpan.text();
          summarySpan.text(oldText.replace(/Dòng #\d+:/, `Dòng #${idx + 1}:`));
          
          $(this).find('select, input, textarea').each(function() {
            const nameAttr = $(this).attr('name');
            if (nameAttr) {
              const newName = nameAttr.replace(/details\[\d+\]/, `details[${idx}]`);
              $(this).attr('name', newName);
            }
          });
        });
        recalculateFormFinancials();
      } else {
        alert("Đơn hàng phải có ít nhất 1 dòng chi tiết sản phẩm/dịch vụ.");
      }
    });

    // 4. RENDER TAB 3: THANH TOÁN (Hiển thị đầy đủ 100% cột trong schema của thu_chi)
    tab3.empty();
    tab3.append(buildInput("tong_tien_theo_HD", "Tổng tiền theo HĐ", recordObj.tong_tien_theo_HD, "number", false, true));
    tab3.append(buildInput("so_tien_km", "Số tiền KM", recordObj.so_tien_km, "number", false, true));
    tab3.append(buildInput("thanh_tien", "Thành Tiền", recordObj.thanh_tien, "number", false, true));
    tab3.append(buildInput("tong_tien_phat_sinh", "Tổng phát sinh", recordObj.tong_tien_phat_sinh, "number", false, true));
    tab3.append(buildInput("tong_tien", "Tổng cộng đơn hàng", recordObj.tong_tien, "number", false, true));
    tab3.append(buildInput("da_thanh_toan", "Đã thanh toán", recordObj.da_thanh_toan, "number", false, true));
    tab3.append(buildInput("con_lai", "Còn lại", recordObj.con_lai, "number", false, true));
    tab3.append('<div class="col-span-full border-t border-slate-200 dark:border-slate-800 pt-4 mt-2"></div>');

    const paymentsAccordionHtml = `
      <div class="col-span-full space-y-3">
        <h4 class="text-xs font-bold text-slate-850 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
          <i class="fa-solid fa-wallet text-blue-500"></i> Quản lý các đợt thanh toán (Thu/Chi)
        </h4>
        <div id="form-payments-accordion-container" class="space-y-3">
          <!-- Payment rows -->
        </div>
        <button type="button" id="btn-form-add-payment" class="px-3.5 py-2 flex items-center gap-1.5 rounded-xl bg-blue-500/10 text-blue-500 hover:bg-blue-600 hover:text-white transition-all text-xs font-semibold cursor-pointer mt-2">
          <i class="fa-solid fa-plus text-[10px]"></i> Thêm đợt thanh toán
        </button>
      </div>
    `;
    tab3.append(paymentsAccordionHtml);

    // Chuẩn bị dropdown Nợ/Có, loại thanh toán, nhân sự cho các đợt thanh toán
    const dkList = (window.MOD_THUCHI && window.MOD_THUCHI.dinhKhoanList) || [];
    const defaultDkList = [
      { value: "111", label: "111 - Tiền mặt" },
      { value: "112", label: "112 - Tiền gửi ngân hàng" },
      { value: "131", label: "131 - Phải thu của khách hàng" },
      { value: "511", label: "511 - Doanh thu bán hàng và cung cấp dịch vụ" },
      { value: "642", label: "642 - Chi phí quản lý doanh nghiệp" }
    ];
    const actualDkList = dkList.length > 0 ? dkList.map(dk => ({ value: dk.id, label: dk.name })) : defaultDkList;
    
    let dkNoOpts = '<option value="">-- Tài khoản Nợ --</option>';
    let dkCoOpts = '<option value="">-- Tài khoản Có --</option>';
    actualDkList.forEach(dk => {
      dkNoOpts += `<option value="${dk.value}">${dk.label}</option>`;
      dkCoOpts += `<option value="${dk.value}">${dk.label}</option>`;
    });

    const tcStatusList = getEnumOptionsLocal("trang_thai", "thu_chi");
    let tcStatusOptsHtml = '<option value="">-- Chọn Trạng Thái --</option>';
    tcStatusList.forEach(opt => {
      let val = opt && typeof opt === 'object' ? opt.value : opt;
      let lbl = opt && typeof opt === 'object' ? opt.label : opt;
      tcStatusOptsHtml += `<option value="${val}">${lbl}</option>`;
    });

    const paymentMethods = getEnumOptionsLocal("hinh_thuc_tt", "thu_chi");
    let paymentMethodsHtml = '';
    paymentMethods.forEach(opt => {
      let val = opt && typeof opt === 'object' ? opt.value : opt;
      let lbl = opt && typeof opt === 'object' ? opt.label : opt;
      paymentMethodsHtml += `<option value="${val}">${lbl}</option>`;
    });

    const paymentTypes = getEnumOptionsLocal("loai_thanh_toan", "thu_chi");
    let paymentTypesHtml = '<option value="">-- Loại thanh toán --</option>';
    paymentTypes.forEach(opt => {
      let val = opt && typeof opt === 'object' ? opt.value : opt;
      let lbl = opt && typeof opt === 'object' ? opt.label : opt;
      paymentTypesHtml += `<option value="${val}">${lbl}</option>`;
    });

    const personnelList = getEnumOptionsLocal("phan_bo_nv", "thu_chi");
    let personnelOptsHtml = '<option value="">-- Chọn Nhân Sự --</option>';
    personnelList.forEach(opt => {
      let val = opt && typeof opt === 'object' ? opt.value : opt;
      let lbl = opt && typeof opt === 'object' ? opt.label : opt;
      personnelOptsHtml += `<option value="${val}">${lbl}</option>`;
    });

    function addPaymentRow(data = {}, idx) {
      const today = dayjs().format("YYYY-MM-DD");
      let formattedDate = today;
      if (data.ngay_lap) {
        if (/^\d{4}-\d{2}-\d{2}$/.test(data.ngay_lap)) {
          formattedDate = data.ngay_lap;
        } else {
          const dObj = new Date(data.ngay_lap);
          if (!isNaN(dObj.getTime())) {
            const y = dObj.getFullYear();
            const m = String(dObj.getMonth() + 1).padStart(2, '0');
            const d = String(dObj.getDate()).padStart(2, '0');
            formattedDate = `${y}-${m}-${d}`;
          }
        }
      }

      const formatDateForInput = (val) => {
        if (!val) return '';
        if (/^\d{4}-\d{2}-\d{2}$/.test(val)) return val;
        const dObj = new Date(val);
        if (!isNaN(dObj.getTime())) {
          const y = dObj.getFullYear();
          const m = String(dObj.getMonth() + 1).padStart(2, '0');
          const d = String(dObj.getDate()).padStart(2, '0');
          return `${y}-${m}-${d}`;
        }
        return '';
      };
      
      const isActive = idx === 0 ? "active" : "";
      const bodyHidden = idx === 0 ? "" : "hidden";
      const chevronIcon = idx === 0 ? "fa-chevron-up" : "fa-chevron-down";
      
      const hangMuc = data.hang_muc || "Thu";
      const hinhThuc = data.hinh_thuc_tt || "Chuyển khoản";
      const soTien = parseFloat(data.so_tien) || 0;
      const formattedAmount = new Intl.NumberFormat('vi-VN').format(soTien);
      const noiDung = data.noi_dung || "Thanh toán hợp đồng";
      
      let summaryText = `Đợt #${idx + 1}: Ngày ${dayjs(formattedDate).format("DD/MM/YYYY")} - [${hangMuc}] - ${noiDung} - ${formattedAmount} đ`;

      const rowHtml = `
        <div class="accordion-item payment-row bg-slate-50/50 dark:bg-slate-900/10 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 transition-all ${isActive}" data-index="${idx}">
          <!-- Header (Master Summary) -->
          <div class="accordion-header flex items-center justify-between cursor-pointer select-none">
            <div class="flex items-center gap-3 w-3/4">
              <i class="fa-solid ${chevronIcon} text-slate-400 text-xs toggle-icon"></i>
              <span class="font-bold text-xs text-slate-700 dark:text-slate-200 label-summary truncate">${summaryText}</span>
              <span class="badge-method bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[10px] text-slate-500 font-bold">${hinhThuc}</span>
            </div>
            <div class="flex items-center gap-2">
              <button type="button" class="btn-remove-pay-row text-slate-400 hover:text-red-500 rounded p-1 transition-colors cursor-pointer animate-none" title="Xóa đợt thanh toán này">
                <i class="fa-solid fa-trash-can text-sm"></i>
              </button>
            </div>
          </div>

          <!-- Body (Hiển thị đầy đủ cột trong schema của thu_chi) -->
          <div class="accordion-body grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-4 mt-3 border-t border-slate-100 dark:border-slate-800/60 ${bodyHidden}">
            <input type="hidden" name="payments[${idx}][id_thu_chi]" value="${data.id_thu_chi || ''}">
            <input type="hidden" name="payments[${idx}][id_don_hang]" value="${data.id_don_hang || recordObj.id_don_hang || ''}">
            <input type="hidden" name="payments[${idx}][id_luong]" value="${data.id_luong || ''}">
            
            <!-- Ngày lập (Required) -->
            <div class="flex flex-col space-y-1">
              <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Ngày lập <span class="text-rose-500">*</span></label>
              <input type="date" name="payments[${idx}][ngay_lap]" value="${formattedDate}" required class="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg text-xs dark:text-white outline-none input-pay-date">
            </div>

            <!-- Hạng mục (Required) -->
            <div class="flex flex-col space-y-1">
              <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Hạng mục <span class="text-rose-500">*</span></label>
              <select name="payments[${idx}][hang_muc]" required class="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg text-xs dark:text-white outline-none select-pay-category">
                <option value="Thu" ${hangMuc === 'Thu' ? 'selected' : ''}>Thu</option>
                <option value="Chi" ${hangMuc === 'Chi' ? 'selected' : ''}>Chi</option>
              </select>
            </div>

            <!-- Hình thức thanh toán (Required) -->
            <div class="flex flex-col space-y-1">
              <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Hình thức TT <span class="text-rose-500">*</span></label>
              <select name="payments[${idx}][hinh_thuc_tt]" required class="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg text-xs dark:text-white outline-none select-pay-method">
                ${paymentMethodsHtml.replace(`value="${hinhThuc}"`, `value="${hinhThuc}" selected`)}
              </select>
            </div>

            <!-- Số tiền (Required) -->
            <div class="flex flex-col space-y-1">
              <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Số tiền <span class="text-rose-500">*</span></label>
              <input type="number" name="payments[${idx}][so_tien]" value="${soTien}" required min="0" class="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg text-xs dark:text-white outline-none input-pay-amount">
            </div>

            <!-- Nội dung (Required) -->
            <div class="flex flex-col space-y-1 md:col-span-2">
              <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Nội dung <span class="text-rose-500">*</span></label>
              <input type="text" name="payments[${idx}][noi_dung]" value="${noiDung}" required class="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg text-xs dark:text-white outline-none input-pay-content">
            </div>

            <!-- Tài khoản Nợ -->
            <div class="flex flex-col space-y-1">
              <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tài khoản Nợ</label>
              <select name="payments[${idx}][tai_khoan_no]" class="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg text-xs dark:text-white outline-none">
                ${dkNoOpts.replace(`value="${data.tai_khoan_no || ''}"`, `value="${data.tai_khoan_no || ''}" selected`)}
              </select>
            </div>

            <!-- Tài khoản Có -->
            <div class="flex flex-col space-y-1">
              <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tài khoản Có</label>
              <select name="payments[${idx}][tai_khoan_co]" class="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg text-xs dark:text-white outline-none">
                ${dkCoOpts.replace(`value="${data.tai_khoan_co || ''}"`, `value="${data.tai_khoan_co || ''}" selected`)}
              </select>
            </div>

            <!-- Trạng thái -->
            <div class="flex flex-col space-y-1">
              <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Trạng thái</label>
              <select name="payments[${idx}][trang_thai]" class="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg text-xs dark:text-white outline-none">
                ${tcStatusOptsHtml.replace(`value="${data.trang_thai || ''}"`, `value="${data.trang_thai || ''}" selected`)}
              </select>
            </div>

            <!-- Giấy báo (giay_bao) -->
            <div class="flex flex-col space-y-1">
              <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Giấy báo</label>
              <input type="text" name="payments[${idx}][giay_bao]" value="${data.giay_bao || ''}" class="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg text-xs dark:text-white outline-none">
            </div>

            <!-- File in (file_in) -->
            <div class="flex flex-col space-y-1">
              <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Link File In</label>
              <input type="text" name="payments[${idx}][file_in]" value="${data.file_in || ''}" class="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg text-xs dark:text-white outline-none">
            </div>

            <!-- Loại thanh toán (loai_thanh_toan) -->
            <div class="flex flex-col space-y-1">
              <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Loại thanh toán</label>
              <select name="payments[${idx}][loai_thanh_toan]" class="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg text-xs dark:text-white outline-none">
                ${paymentTypesHtml.replace(`value="${data.loai_thanh_toan || ''}"`, `value="${data.loai_thanh_toan || ''}" selected`)}
              </select>
            </div>

            <!-- Ngày thực hiện (ngay_thuc_hien) -->
            <div class="flex flex-col space-y-1">
              <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Ngày thực hiện</label>
              <input type="date" name="payments[${idx}][ngay_thuc_hien]" value="${formatDateForInput(data.ngay_thuc_hien)}" class="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg text-xs dark:text-white outline-none">
            </div>

            <!-- Chứng từ (chung_tu) -->
            <div class="flex flex-col space-y-1">
              <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Chứng từ</label>
              <input type="text" name="payments[${idx}][chung_tu]" value="${data.chung_tu || ''}" class="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg text-xs dark:text-white outline-none">
            </div>

            <!-- Phân bổ nhân viên (phan_bo_nv) -->
            <div class="flex flex-col space-y-1">
              <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Phân bổ nhân viên</label>
              <select name="payments[${idx}][phan_bo_nv]" class="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg text-xs dark:text-white outline-none">
                ${personnelOptsHtml.replace(`value="${data.phan_bo_nv || ''}"`, `value="${data.phan_bo_nv || ''}" selected`)}
              </select>
            </div>

            <!-- Đối tượng (doi_tuong) -->
            <div class="flex flex-col space-y-1">
              <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Đối tượng nhận/trả</label>
              <input type="text" name="payments[${idx}][doi_tuong]" value="${data.doi_tuong || ''}" class="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg text-xs dark:text-white outline-none">
            </div>

            <!-- Ghi chú (Full width) -->
            <div class="flex flex-col space-y-1 md:col-span-2">
              <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Ghi chú</label>
              <textarea name="payments[${idx}][ghi_chu]" rows="2" class="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg text-xs dark:text-white outline-none">${data.ghi_chu || ''}</textarea>
            </div>
          </div>
        </div>
      `;
      $('#form-payments-accordion-container').append(rowHtml);
    }

    // Nạp cũ
    const tcListOld = window.AppCRUD.isEdit ? rawThuChi.filter(r => String(r.id_don_hang).trim() === String(recordObj.id_don_hang).trim()) : [];
    if (tcListOld.length > 0) {
      tcListOld.forEach((item, index) => {
        addPaymentRow(item, index);
      });
    }

    // Thêm dòng thanh toán
    $('#btn-form-add-payment').off('click').on('click', function() {
      const nextIdx = $('#form-payments-accordion-container .payment-row').length;
      addPaymentRow({}, nextIdx);
      recalculateFormFinancials();
    });

    // Lắng nghe thay đổi ở Thanh toán
    $(document).off('input change', '.payment-row input, .payment-row select').on('input change', '.payment-row input, .payment-row select', function() {
      const $row = $(this).closest('.payment-row');
      const idx = parseInt($row.attr('data-index'), 10);
      const dateVal = $row.find('.input-pay-date').val();
      const cat = $row.find('.select-pay-category').val();
      const method = $row.find('.select-pay-method').val();
      const amt = parseFloat($row.find('.input-pay-amount').val()) || 0;
      const content = $row.find('.input-pay-content').val();
      
      const formattedDate = dateVal ? dayjs(dateVal).format("DD/MM/YYYY") : dayjs().format("DD/MM/YYYY");
      const formattedAmount = new Intl.NumberFormat('vi-VN').format(amt);
      
      $row.find('.label-summary').text(`Đợt #${idx + 1}: Ngày ${formattedDate} - [${cat}] - ${content} - ${formattedAmount} đ`);
      $row.find('.badge-method').text(method);
      
      recalculateFormFinancials();
    });

    // Xóa dòng thanh toán
    $(document).off('click', '.payment-row .btn-remove-pay-row').on('click', '.payment-row .btn-remove-pay-row', function(e) {
      e.stopPropagation();
      $(this).closest('.payment-row').remove();
      const $container = $('#form-payments-accordion-container');
      $container.children('.payment-row').each(function(idx) {
        $(this).attr('data-index', idx);
        const summarySpan = $(this).find('.label-summary');
        const oldText = summarySpan.text();
        summarySpan.text(oldText.replace(/Đợt #\d+:/, `Đợt #${idx + 1}:`));
        
        $(this).find('select, input, textarea').each(function() {
          const nameAttr = $(this).attr('name');
          if (nameAttr) {
            const newName = nameAttr.replace(/payments\[\d+\]/, `payments[${idx}]`);
            $(this).attr('name', newName);
          }
        });
      });
      recalculateFormFinancials();
    });

    // Lắng nghe thay đổi cost ở Tab 1 để tính lại lợi nhuận
    $(document).off('input change', 'input[name="chi_phi_cost"]').on('input change', 'input[name="chi_phi_cost"]', function() {
      recalculateFormFinancials();
    });

    // Sự kiện toggle Accordion dùng chung cho cả 2 tab
    $(document).off('click', '.accordion-header').on('click', '.accordion-header', function(e) {
      if ($(e.target).closest('.btn-remove-row, .btn-remove-pay-row').length) return;
      const $item = $(this).closest('.accordion-item');
      const $body = $item.find('.accordion-body');
      const $icon = $(this).find('.toggle-icon');
      const isHidden = $body.hasClass('hidden');
      if (isHidden) {
        $body.removeClass('hidden');
        $item.addClass('active');
        $icon.removeClass('fa-chevron-down').addClass('fa-chevron-up');
      } else {
        $body.addClass('hidden');
        $item.removeClass('active');
        $icon.removeClass('fa-chevron-up').addClass('fa-chevron-down');
      }
    });

    // Khởi chạy Show_If Tab 1 lần đầu
    applyFormShowIf();
    recalculateFormFinancials();
  }

  function recalculateFormFinancials() {
    let sumTotalHDOngia = 0;
    let sumTotalHDKm = 0;
    let sumTotalHDThanhTien = 0;
    let sumPhatSinh = 0;
    
    $('#form-details-accordion-container .detail-row').each(function() {
      const category = $(this).find('.select-category').val();
      const qty = parseFloat($(this).find('.input-qty').val()) || 0;
      const price = parseFloat($(this).find('.input-price').val()) || 0;
      const discount = parseFloat($(this).find('.input-discount').val()) || 0;
      
      const lineTotal = qty * price;
      const lineSubtotal = lineTotal - discount;
      
      $(this).find('.input-line-thanhtien').val(lineTotal);
      $(this).find('.input-line-subtotal').val(lineSubtotal);
      
      if (category === "Hợp đồng") {
        sumTotalHDOngia += lineTotal;
        sumTotalHDKm += discount;
        sumTotalHDThanhTien += lineSubtotal;
      } else {
        sumPhatSinh += lineSubtotal;
      }
    });

    $('input[name="tong_tien_theo_HD"]').val(sumTotalHDOngia);
    $('input[name="so_tien_km"]').val(sumTotalHDKm);
    
    const thTien = sumTotalHDOngia - sumTotalHDKm;
    $('input[name="thanh_tien"]').val(thTien);
    $('input[name="tong_tien_phat_sinh"]').val(sumPhatSinh);
    
    const grandTotal = thTien + sumPhatSinh;
    $('input[name="tong_tien"]').val(grandTotal);

    // Tính Lợi Nhuận Thuần ở Tab 1
    const cost = parseFloat($('input[name="chi_phi_cost"]').val()) || 0;
    $('input[name="loi_nhuan_thuan"]').val(thTien - cost);

    // Thanh toán
    let totalPaid = 0;
    $('#form-payments-accordion-container .payment-row').each(function() {
      const type = $(this).find('select[name*="hang_muc"]').val() || "Thu";
      const amt = parseFloat($(this).find('.input-pay-amount').val()) || 0;
      if (type === "Thu") {
        totalPaid += amt;
      } else {
        totalPaid -= amt;
      }
    });
    
  }


  return {
    init: function() {
      setupEventHandlers();
      this.fetchData(false);
    },
    fetchData: fetchDataLake,
    renderCharts: updateCharts,
    toggleZoom: function(canvasId, btnElement) {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return;
      const card = canvas.closest('.glass-card') || canvas.closest('.panel');
      if (!card) return;
      
      const isZoomed = card.classList.contains('panel-zoomed');
      if (isZoomed) {
        card.classList.remove('panel-zoomed');
        btnElement.innerHTML = '<i class="fa-solid fa-expand-arrows-alt text-xs"></i>';
        updateDashboard(); 
      } else {
        card.classList.add('panel-zoomed');
        btnElement.innerHTML = '<i class="fa-solid fa-compress-arrows-alt text-xs"></i>';
        const chart = Chart.getChart(canvasId);
        if (chart) chart.resize();
      }
    },
    switchTab: function(tabName) {
      currentTab = tabName;
      const filtered = getFilteredData();
      renderTable(filtered.filteredForTable);
    },
    openDrilldown: openDrilldown,
    closeDrilldown: closeDrilldown,
    deleteRecord: deleteRecord,
    customRenderForm: customRenderForm,
    customRenderDetail: openDrilldown,
    cleanup: function() {
      if (chartDonChot) { chartDonChot.destroy(); chartDonChot = null; }
      if (chartDoanhThuThang) { chartDoanhThuThang.destroy(); chartDoanhThuThang = null; }
      if (chartLoaiDv) { chartLoaiDv.destroy(); chartLoaiDv = null; }
      if (chartNguonKhach) { chartNguonKhach.destroy(); chartNguonKhach = null; }
      if (chartTyTrongCp) { chartTyTrongCp.destroy(); chartTyTrongCp = null; }
      if (mainTable) { mainTable.destroy(); mainTable = null; }
    }
  };
})();
