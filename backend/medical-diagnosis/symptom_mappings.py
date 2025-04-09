# symptom_mappings.py

# Danh sách triệu chứng
SYMPTOMS = [
    'kho_tho', 'tuc_nguc', 'ho', 'met_moi', 'buon_non', 'chan_an', 'tim_dap_nhanh', 'tho_nhanh',
    'chong_mat', 'ngat_xiu', 'phu_ne', 'kho_khe', 'ho_ra_mau', 'sot', 'sut_can', 'ra_mo_hoi_dem',
    'ngay_to', 'ngung_tho_khi_ngu', 'kho_nuot', 'dom_dac', 'nang_nguc', 'tho_rit', 'dau_bung',
    'day_hoi', 'o_chua', 'o_nong', 'non_mua', 'tieu_chay', 'tao_bon', 'phan_co_mau', 'phan_den',
    'nuot_nghen', 'cam_giac_no_som', 'dau_thuong_vi', 'dau_quan_bung', 'ngua_hau_mon', 'vang_da',
    'vang_mat', 'nuoc_tieu_sam_mau', 'hoi_tho_hoi', 'nong_rat_vung_bung', 'dau_sau_an',
    'dau_khi_dai_tien', 'dau_dau', 'mat_thang_bang', 'te_tay_chan', 'yeu_liet_co', 'co_giat',
    'run_tay_chan', 'mat_ngu', 'ngu_li_bi', 'lu_lan', 'mat_tri_nho', 'noi_kho', 'nuot_kho',
    'mat_y_thuc', 'nhin_doi', 'roi_loan_thi_giac', 'roi_loan_van_dong', 'dau_day_than_kinh',
    'mat_cam_giac', 'roi_loan_hanh_vi', 'lo_au', 'tram_cam', 'roi_loan_cam_xuc', 'dau_khop',
    'sung_khop', 'cung_khop', 'viem_khop', 'dau_co', 'yeu_co', 'chuot_rut', 'teo_co', 'dau_lung',
    'dau_vai_gay', 'te_tay', 'te_chan', 'han_che_van_dong', 'kho_di_lai',
    'mat_suc_cam_nam', 'khop_keu', 'bien_dang_khop', 'gay_xuong_tai_phat', 'tang_can',
    'khat_nhieu', 'tieu_nhieu', 'tieu_dem', 'roi_loan_kinh_nguyet', 'lanh_tay_chan', 'da_kho',
    'rung_toc', 'run_tay', 'do_mo_hoi_nhieu', 'hoi_hop', 'giam_ham_muon', 'phu_mat',
    'rung_long_may', 'tang_huyet_ap', 'da_sam', 'on_lanh', 'phat_ban', 'noi_hach', 'ngua_da',
    'sot_keo_dai', 'loet_mieng', 'roi_loan_tieu_hoa', 'viem_hong', 'dau_hong', 'dau_bung_duoi',
    'tieu_buot', 'tieu_kho', 'nuoc_tieu_co_mau', 'sung_chan', 'tieu_ra_bot', 'dau_khi_tieu',
    'tieu_it', 'mat_nuoc'
]

# Ánh xạ triệu chứng sang chuyên khoa và bệnh
SYMPTOM_TO_SPECIALTY_DISEASES = {
    # Tiêu Hóa
    'dau_bung': {
        'specialty': 'Tiêu Hóa',
        'possible_diseases': ['Viêm dạ dày', 'Rối loạn tiêu hóa', 'Nhiễm khuẩn đường ruột', 'Viêm ruột thừa']
    },
    'buon_non': {
        'specialty': 'Tiêu Hóa',
        'possible_diseases': ['Viêm dạ dày', 'Rối loạn tiêu hóa', 'Ngộ độc thực phẩm']
    },
    'tieu_chay': {
        'specialty': 'Tiêu Hóa',
        'possible_diseases': ['Nhiễm khuẩn đường ruột', 'Rối loạn tiêu hóa', 'Viêm đại tràng']
    },
    'non_mua': {
        'specialty': 'Tiêu Hóa',
        'possible_diseases': ['Viêm dạ dày', 'Ngộ độc thực phẩm', 'Rối loạn tiêu hóa']
    },
    'day_hoi': {
        'specialty': 'Tiêu Hóa',
        'possible_diseases': ['Rối loạn tiêu hóa', 'Viêm dạ dày', 'Trào ngược dạ dày']
    },
    'o_chua': {
        'specialty': 'Tiêu Hóa',
        'possible_diseases': ['Trào ngược dạ dày', 'Viêm dạ dày']
    },
    'o_nong': {
        'specialty': 'Tiêu Hóa',
        'possible_diseases': ['Trào ngược dạ dày', 'Viêm dạ dày']
    },
    'tao_bon': {
        'specialty': 'Tiêu Hóa',
        'possible_diseases': ['Rối loạn tiêu hóa', 'Táo bón mãn tính']
    },
    'phan_co_mau': {
        'specialty': 'Tiêu Hóa',
        'possible_diseases': ['Viêm đại tràng', 'Trĩ', 'Ung thư đại tràng']
    },
    'phan_den': {
        'specialty': 'Tiêu Hóa',
        'possible_diseases': ['Xuất huyết tiêu hóa', 'Loét dạ dày']
    },
    'nuot_nghen': {
        'specialty': 'Tiêu Hóa',
        'possible_diseases': ['Trào ngược dạ dày', 'Viêm thực quản']
    },
    'cam_giac_no_som': {
        'specialty': 'Tiêu Hóa',
        'possible_diseases': ['Rối loạn tiêu hóa', 'Viêm dạ dày']
    },
    'dau_thuong_vi': {
        'specialty': 'Tiêu Hóa',
        'possible_diseases': ['Viêm dạ dày', 'Loét dạ dày', 'Trào ngược dạ dày']
    },
    'dau_quan_bung': {
        'specialty': 'Tiêu Hóa',
        'possible_diseases': ['Rối loạn tiêu hóa', 'Viêm ruột thừa']
    },
    'ngua_hau_mon': {
        'specialty': 'Tiêu Hóa',
        'possible_diseases': ['Trĩ', 'Nhiễm ký sinh trùng']
    },
    'nong_rat_vung_bung': {
        'specialty': 'Tiêu Hóa',
        'possible_diseases': ['Viêm dạ dày', 'Loét dạ dày']
    },
    'dau_sau_an': {
        'specialty': 'Tiêu Hóa',
        'possible_diseases': ['Viêm dạ dày', 'Loét dạ dày']
    },
    'dau_khi_dai_tien': {
        'specialty': 'Tiêu Hóa',
        'possible_diseases': ['Trĩ', 'Viêm đại tràng']
    },
    'roi_loan_tieu_hoa': {
        'specialty': 'Tiêu Hóa',
        'possible_diseases': ['Rối loạn tiêu hóa', 'Viêm đại tràng']
    },
    'vang_da': {
        'specialty': 'Tiêu Hóa',
        'possible_diseases': ['Viêm gan', 'Sỏi mật', 'Tắc mật']
    },
    'vang_mat': {
        'specialty': 'Tiêu Hóa',
        'possible_diseases': ['Viêm gan', 'Sỏi mật', 'Tắc mật']
    },
    'nuoc_tieu_sam_mau': {
        'specialty': 'Tiêu Hóa',
        'possible_diseases': ['Viêm gan', 'Sỏi mật']
    },
    'hoi_tho_hoi': {
        'specialty': 'Tiêu Hóa',
        'possible_diseases': ['Viêm dạ dày', 'Trào ngược dạ dày']
    },

    # Thần Kinh
    'dau_dau': {
        'specialty': 'Thần Kinh',
        'possible_diseases': ['Đau nửa đầu', 'Thiếu máu não', 'Căng thẳng thần kinh']
    },
    'chong_mat': {
        'specialty': 'Thần Kinh',
        'possible_diseases': ['Rối loạn tiền đình', 'Thiếu máu não']
    },
    'mat_thang_bang': {
        'specialty': 'Thần Kinh',
        'possible_diseases': ['Rối loạn tiền đình', 'Đột quỵ']
    },
    'te_tay_chan': {
        'specialty': 'Thần Kinh',
        'possible_diseases': ['Bệnh thần kinh ngoại biên', 'Đột quỵ']
    },
    'yeu_liet_co': {
        'specialty': 'Thần Kinh',
        'possible_diseases': ['Đột quỵ', 'Bệnh thần kinh vận động']
    },
    'co_giat': {
        'specialty': 'Thần Kinh',
        'possible_diseases': ['Động kinh', 'Hạ đường huyết']
    },
    'run_tay_chan': {
        'specialty': 'Thần Kinh',
        'possible_diseases': ['Bệnh Parkinson', 'Rối loạn thần kinh']
    },
    'mat_ngu': {
        'specialty': 'Thần Kinh',
        'possible_diseases': ['Mất ngủ mãn tính', 'Rối loạn lo âu']
    },
    'ngu_li_bi': {
        'specialty': 'Thần Kinh',
        'possible_diseases': ['Rối loạn giấc ngủ', 'Trầm cảm']
    },
    'lu_lan': {
        'specialty': 'Thần Kinh',
        'possible_diseases': ['Sa sút trí tuệ', 'Alzheimer']
    },
    'mat_tri_nho': {
        'specialty': 'Thần Kinh',
        'possible_diseases': ['Sa sút trí tuệ', 'Alzheimer']
    },
    'noi_kho': {
        'specialty': 'Thần Kinh',
        'possible_diseases': ['Đột quỵ', 'Bệnh thần kinh vận động']
    },
    'nuot_kho': {
        'specialty': 'Thần Kinh',
        'possible_diseases': ['Đột quỵ', 'Bệnh thần kinh vận động']
    },
    'mat_y_thuc': {
        'specialty': 'Thần Kinh',
        'possible_diseases': ['Động kinh', 'Đột quỵ']
    },
    'nhin_doi': {
        'specialty': 'Thần Kinh',
        'possible_diseases': ['Đột quỵ', 'Rối loạn thần kinh thị giác']
    },
    'roi_loan_thi_giac': {
        'specialty': 'Thần Kinh',
        'possible_diseases': ['Đột quỵ', 'Rối loạn thần kinh thị giác']
    },
    'roi_loan_van_dong': {
        'specialty': 'Thần Kinh',
        'possible_diseases': ['Đột quỵ', 'Bệnh Parkinson']
    },
    'dau_day_than_kinh': {
        'specialty': 'Thần Kinh',
        'possible_diseases': ['Viêm dây thần kinh', 'Thoát vị đĩa đệm']
    },
    'mat_cam_giac': {
        'specialty': 'Thần Kinh',
        'possible_diseases': ['Bệnh thần kinh ngoại biên', 'Đột quỵ']
    },
    'roi_loan_hanh_vi': {
        'specialty': 'Thần Kinh',
        'possible_diseases': ['Rối loạn tâm thần', 'Sa sút trí tuệ']
    },
    'lo_au': {
        'specialty': 'Thần Kinh',
        'possible_diseases': ['Rối loạn lo âu', 'Trầm cảm']
    },
    'tram_cam': {
        'specialty': 'Thần Kinh',
        'possible_diseases': ['Trầm cảm', 'Rối loạn cảm xúc']
    },
    'roi_loan_cam_xuc': {
        'specialty': 'Thần Kinh',
        'possible_diseases': ['Rối loạn cảm xúc', 'Trầm cảm']
    },

    # Hô Hấp - Phổi
    'kho_tho': {
        'specialty': 'Hô Hấp - Phổi',
        'possible_diseases': ['Hen suyễn', 'Viêm phổi', 'Suy tim']
    },
    'tuc_nguc': {
        'specialty': 'Hô Hấp - Phổi',
        'possible_diseases': ['Viêm phổi', 'Suy tim', 'Nhồi máu cơ tim']
    },
    'ho': {
        'specialty': 'Hô Hấp - Phổi',
        'possible_diseases': ['Viêm phổi', 'Viêm phế quản', 'Cảm cúm']
    },
    'tho_nhanh': {
        'specialty': 'Hô Hấp - Phổi',
        'possible_diseases': ['Viêm phổi', 'Hen suyễn']
    },
    'kho_khe': {
        'specialty': 'Hô Hấp - Phổi',
        'possible_diseases': ['Hen suyễn', 'Viêm phế quản']
    },
    'ho_ra_mau': {
        'specialty': 'Hô Hấp - Phổi',
        'possible_diseases': ['Lao phổi', 'Ung thư phổi']
    },
    'nang_nguc': {
        'specialty': 'Hô Hấp - Phổi',
        'possible_diseases': ['Viêm phổi', 'Suy tim']
    },
    'tho_rit': {
        'specialty': 'Hô Hấp - Phổi',
        'possible_diseases': ['Hen suyễn', 'Viêm phế quản']
    },
    'viem_hong': {
        'specialty': 'Hô Hấp - Phổi',
        'possible_diseases': ['Viêm họng', 'Cảm cúm']
    },
    'dau_hong': {
        'specialty': 'Hô Hấp - Phổi',
        'possible_diseases': ['Viêm họng', 'Cảm cúm']
    },
    'ngay_to': {
        'specialty': 'Hô Hấp - Phổi',
        'possible_diseases': ['Ngáy ngủ', 'Hội chứng ngưng thở khi ngủ']
    },
    'ngung_tho_khi_ngu': {
        'specialty': 'Hô Hấp - Phổi',
        'possible_diseases': ['Hội chứng ngưng thở khi ngủ', 'Suy hô hấp']
    },
    'kho_nuot': {
        'specialty': 'Hô Hấp - Phổi',
        'possible_diseases': ['Viêm họng', 'Viêm thực quản']
    },
    'dom_dac': {
        'specialty': 'Hô Hấp - Phổi',
        'possible_diseases': ['Viêm phế quản', 'Viêm phổi']
    },

    # Tim Mạch
    'tim_dap_nhanh': {
        'specialty': 'Tim Mạch',
        'possible_diseases': ['Rối loạn nhịp tim', 'Suy tim']
    },
    'hoi_hop': {
        'specialty': 'Tim Mạch',
        'possible_diseases': ['Rối loạn nhịp tim', 'Suy tim']
    },
    'tang_huyet_ap': {
        'specialty': 'Tim Mạch',
        'possible_diseases': ['Tăng huyết áp', 'Bệnh tim mạch']
    },
    'phu_ne': {
        'specialty': 'Tim Mạch',
        'possible_diseases': ['Suy tim', 'Bệnh tim mạch']
    },
    'ngat_xiu': {
        'specialty': 'Tim Mạch',
        'possible_diseases': ['Rối loạn nhịp tim', 'Hạ huyết áp']
    },

    # Thận - Niệu
    'dau_bung_duoi': {
        'specialty': 'Thận - Niệu',
        'possible_diseases': ['Sỏi thận', 'Nhiễm trùng đường tiết niệu']
    },
    'tieu_buot': {
        'specialty': 'Thận - Niệu',
        'possible_diseases': ['Nhiễm trùng đường tiết niệu', 'Sỏi thận']
    },
    'tieu_kho': {
        'specialty': 'Thận - Niệu',
        'possible_diseases': ['Sỏi thận', 'Tăng sinh tuyến giáp']
    },
    'nuoc_tieu_co_mau': {
        'specialty': 'Thận - Niệu',
        'possible_diseases': ['Nhiễm trùng đường tiết niệu', 'Sỏi thận']
    },
    'sung_chan': {
        'specialty': 'Thận - Niệu',
        'possible_diseases': ['Suy thận', 'Hội chứng thận hư']
    },
    'tieu_ra_bot': {
        'specialty': 'Thận - Niệu',
        'possible_diseases': ['Suy thận', 'Hội chứng thận hư']
    },
    'dau_khi_tieu': {
        'specialty': 'Thận - Niệu',
        'possible_diseases': ['Nhiễm trùng đường tiết niệu', 'Sỏi thận']
    },
    'tieu_it': {
        'specialty': 'Thận - Niệu',
        'possible_diseases': ['Suy thận', 'Mất nước']
    },
    'mat_nuoc': {
        'specialty': 'Thận - Niệu',
        'possible_diseases': ['Mất nước', 'Suy thận']
    },

    # Cơ - Xương - Khớp
    'dau_khop': {
        'specialty': 'Cơ - Xương - Khớp',
        'possible_diseases': ['Viêm khớp', 'Thoái hóa khớp']
    },
    'sung_khop': {
        'specialty': 'Cơ - Xương - Khớp',
        'possible_diseases': ['Viêm khớp', 'Gout']
    },
    'cung_khop': {
        'specialty': 'Cơ - Xương - Khớp',
        'possible_diseases': ['Thoái hóa khớp', 'Viêm khớp']
    },
    'viem_khop': {
        'specialty': 'Cơ - Xương - Khớp',
        'possible_diseases': ['Viêm khớp dạng thấp', 'Gout']
    },
    'dau_lung': {
        'specialty': 'Cơ - Xương - Khớp',
        'possible_diseases': ['Thoát vị đĩa đệm', 'Thoái hóa cột sống']
    },
    'dau_vai_gay': {
        'specialty': 'Cơ - Xương - Khớp',
        'possible_diseases': ['Thoái hóa đốt sống cổ', 'Viêm quanh khớp vai']
    },
    'bien_dang_khop': {
        'specialty': 'Cơ - Xương - Khớp',
        'possible_diseases': ['Viêm khớp dạng thấp', 'Thoái hóa khớp']
    },
    'gay_xuong_tai_phat': {
        'specialty': 'Cơ - Xương - Khớp',
        'possible_diseases': ['Loãng xương', 'Chấn thương']
    },
    'dau_co': {
        'specialty': 'Cơ - Xương - Khớp',
        'possible_diseases': ['Co thắt cơ', 'Thoái hóa cột sống']
    },
    'yeu_co': {
        'specialty': 'Cơ - Xương - Khớp',
        'possible_diseases': ['Yếu cơ', 'Bệnh cơ']
    },
    'chuot_rut': {
        'specialty': 'Cơ - Xương - Khớp',
        'possible_diseases': ['Thiếu khoáng chất', 'Co thắt cơ']
    },
    'teo_co': {
        'specialty': 'Cơ - Xương - Khớp',
        'possible_diseases': ['Teo cơ', 'Bệnh thần kinh vận động']
    },
    'te_tay': {
        'specialty': 'Cơ - Xương - Khớp',
        'possible_diseases': ['Thoát vị đĩa đệm', 'Hội chứng ống cổ tay']
    },
    'te_chan': {
        'specialty': 'Cơ - Xương - Khớp',
        'possible_diseases': ['Thoát vị đĩa đệm', 'Bệnh thần kinh ngoại biên']
    },
    'han_che_van_dong': {
        'specialty': 'Cơ - Xương - Khớp',
        'possible_diseases': ['Viêm khớp', 'Thoái hóa khớp']
    },
    'kho_di_lai': {
        'specialty': 'Cơ - Xương - Khớp',
        'possible_diseases': ['Viêm khớp', 'Thoái hóa khớp']
    },
    'mat_suc_cam_nam': {
        'specialty': 'Cơ - Xương - Khớp',
        'possible_diseases': ['Hội chứng ống cổ tay', 'Yếu cơ']
    },
    'khop_keu': {
        'specialty': 'Cơ - Xương - Khớp',
        'possible_diseases': ['Thoái hóa khớp', 'Viêm khớp']
    },

    # Nội Tiết (Mới thêm)
    'tang_can': {
        'specialty': 'Nội Tiết',
        'possible_diseases': ['Suy giáp', 'Hội chứng Cushing']
    },
    'khat_nhieu': {
        'specialty': 'Nội Tiết',
        'possible_diseases': ['Tiểu đường', 'Đái tháo nhạt']
    },
    'tieu_nhieu': {
        'specialty': 'Nội Tiết',
        'possible_diseases': ['Tiểu đường', 'Đái tháo nhạt']
    },
    'tieu_dem': {
        'specialty': 'Nội Tiết',
        'possible_diseases': ['Tiểu đường', 'Suy thận']
    },
    'roi_loan_kinh_nguyet': {
        'specialty': 'Nội Tiết',
        'possible_diseases': ['Hội chứng buồng trứng đa nang', 'Suy giáp']
    },
    'lanh_tay_chan': {
        'specialty': 'Nội Tiết',
        'possible_diseases': ['Suy giáp', 'Thiếu máu']
    },
    'da_kho': {
        'specialty': 'Nội Tiết',
        'possible_diseases': ['Suy giáp', 'Tiểu đường']
    },
    'rung_toc': {
        'specialty': 'Nội Tiết',
        'possible_diseases': ['Suy giáp', 'Rối loạn nội tiết']
    },
    'run_tay': {
        'specialty': 'Nội Tiết',
        'possible_diseases': ['Cường giáp', 'Hạ đường huyết']
    },
    'do_mo_hoi_nhieu': {
        'specialty': 'Nội Tiết',
        'possible_diseases': ['Cường giáp', 'Hạ đường huyết']
    },
    'hoi_hop': {
        'specialty': 'Nội Tiết',
        'possible_diseases': ['Cường giáp', 'Hạ đường huyết']
    },
    'giam_ham_muon': {
        'specialty': 'Nội Tiết',
        'possible_diseases': ['Suy giáp', 'Suy tuyến thượng thận']
    },
    'phu_mat': {
        'specialty': 'Nội Tiết',
        'possible_diseases': ['Suy giáp', 'Hội chứng Cushing']
    },
    'rung_long_may': {
        'specialty': 'Nội Tiết',
        'possible_diseases': ['Suy giáp', 'Rối loạn nội tiết']
    },
    'da_sam': {
        'specialty': 'Nội Tiết',
        'possible_diseases': ['Suy tuyến thượng thận', 'Tiểu đường']
    },

    # Truyền Nhiễm (Mới thêm)
    'sot': {
        'specialty': 'Truyền Nhiễm',
        'possible_diseases': ['Cảm cúm', 'Sốt xuất huyết', 'Nhiễm virus']
    },
    'sot_keo_dai': {
        'specialty': 'Truyền Nhiễm',
        'possible_diseases': ['Lao', 'Nhiễm khuẩn huyết', 'Sốt rét']
    },
    'on_lanh': {
        'specialty': 'Truyền Nhiễm',
        'possible_diseases': ['Cảm cúm', 'Sốt xuất huyết', 'Nhiễm virus']
    },
    'phat_ban': {
        'specialty': 'Truyền Nhiễm',
        'possible_diseases': ['Sốt xuất huyết', 'Thủy đậu', 'Sởi']
    },
    'noi_hach': {
        'specialty': 'Truyền Nhiễm',
        'possible_diseases': ['Nhiễm khuẩn', 'Lao hạch', 'Ung thư hạch']
    },
    'ngua_da': {
        'specialty': 'Truyền Nhiễm',
        'possible_diseases': ['Dị ứng', 'Nhiễm ký sinh trùng', 'Sởi']
    },
    'loet_mieng': {
        'specialty': 'Truyền Nhiễm',
        'possible_diseases': ['Nhiệt miệng', 'Nhiễm virus herpes', 'Tay chân miệng']
    },
    'ra_mo_hoi_dem': {
        'specialty': 'Truyền Nhiễm',
        'possible_diseases': ['Lao', 'Nhiễm khuẩn huyết']
    },
    'sut_can': {
        'specialty': 'Truyền Nhiễm',
        'possible_diseases': ['Lao', 'HIV/AIDS', 'Nhiễm ký sinh trùng']
    },

    # Nội Tổng Quát (Bổ sung cho các triệu chứng chưa được ánh xạ)
    'met_moi': {
        'specialty': 'Nội Tổng Quát',
        'possible_diseases': ['Thiếu máu', 'Suy nhược cơ thể', 'Hạ đường huyết']
    },
    'chan_an': {
        'specialty': 'Nội Tổng Quát',
        'possible_diseases': ['Thiếu máu', 'Suy nhược cơ thể', 'Trầm cảm']
    }
}

# Từ điển ánh xạ từ khóa sang triệu chứng
KEYWORD_TO_SYMPTOM = {
    'khó thở': 'kho_tho',
    'thở khó': 'kho_tho',
    'hụt hơi': 'kho_tho',
    'tức ngực': 'tuc_nguc',
    'đau tức ngực': 'tuc_nguc',
    'ngực bị tức': 'tuc_nguc',
    'ho': 'ho',
    'ho nhiều': 'ho',
    'ho khan': 'ho',
    'ho có đờm': 'ho',
    'mệt mỏi': 'met_moi',
    'mệt': 'met_moi',
    'uể oải': 'met_moi',
    'thiếu sức sống': 'met_moi',
    'buồn nôn': 'buon_non',
    'nôn nao': 'buon_non',
    'muốn ói': 'buon_non',
    'chán ăn': 'chan_an',
    'không muốn ăn': 'chan_an',
    'mất ngon miệng': 'chan_an',
    'tim đập nhanh': 'tim_dap_nhanh',
    'hồi hộp': 'tim_dap_nhanh',
    'tim đập mạnh': 'tim_dap_nhanh',
    'thở nhanh': 'tho_nhanh',
    'thở gấp': 'tho_nhanh',
    'hơi thở nhanh': 'tho_nhanh',
    'chóng mặt': 'chong_mat',
    'hoa mắt': 'chong_mat',
    'đầu óc quay cuồng': 'chong_mat',
    'ngất xỉu': 'ngat_xiu',
    'mất ý thức': 'ngat_xiu',
    'ngất': 'ngat_xiu',
    'phù nề': 'phu_ne',
    'sưng phù': 'phu_ne',
    'phù chân': 'phu_ne',
    'phù toàn thân': 'phu_ne',
    'khò khè': 'kho_khe',
    'thở khò khè': 'kho_khe',
    'tiếng thở khò khè': 'kho_khe',
    'ho ra máu': 'ho_ra_mau',
    'đờm có máu': 'ho_ra_mau',
    'ho kèm máu': 'ho_ra_mau',
    'sốt': 'sot',
    'nóng sốt': 'sot',
    'sốt cao': 'sot',
    'sốt nhẹ': 'sot',
    'sút cân': 'sut_can',
    'giảm cân': 'sut_can',
    'gầy đi': 'sut_can',
    'sụt cân không rõ lý do': 'sut_can',
    'ra mồ hôi đêm': 'ra_mo_hoi_dem',
    'đổ mồ hôi đêm': 'ra_mo_hoi_dem',
    'mồ hôi đêm nhiều': 'ra_mo_hoi_dem',
    'ngáy to': 'ngay_to',
    'ngáy lớn': 'ngay_to',
    'ngáy khi ngủ': 'ngay_to',
    'ngưng thở khi ngủ': 'ngung_tho_khi_ngu',
    'ngừng thở lúc ngủ': 'ngung_tho_khi_ngu',
    'ngưng thở': 'ngung_tho_khi_ngu',
    'khó nuốt': 'kho_nuot',
    'nuốt khó': 'kho_nuot',
    'cảm giác khó nuốt': 'kho_nuot',
    'đờm đặc': 'dom_dac',
    'đờm dính': 'dom_dac',
    'đờm khó khạc': 'dom_dac',
    'nặng ngực': 'nang_nguc',
    'ngực nặng': 'nang_nguc',
    'cảm giác nặng ngực': 'nang_nguc',
    'thở rít': 'tho_rit',
    'tiếng thở rít': 'tho_rit',
    'hơi thở rít': 'tho_rit',
    'đau bụng': 'dau_bung',
    'bụng đau': 'dau_bung',
    'đau vùng bụng': 'dau_bung',
    'đau bụng âm ỉ': 'dau_bung',
    'đầy hơi': 'day_hoi',
    'bụng đầy': 'day_hoi',
    'chướng bụng': 'day_hoi',
    'ợ chua': 'o_chua',
    'ợ nóng': 'o_nong',
    'ợ lên chua': 'o_chua',
    'ợ lên nóng': 'o_nong',
    'nóng rát ngực': 'o_nong',
    'nôn mửa': 'non_mua',
    'ói mửa': 'non_mua',
    'nôn nhiều': 'non_mua',
    'tiêu chảy': 'tieu_chay',
    'đi ngoài phân lỏng': 'tieu_chay',
    'đi tiêu lỏng': 'tieu_chay',
    'tiêu chảy nhẹ': 'tieu_chay',
    'táo bón': 'tao_bon',
    'khó đi cầu': 'tao_bon',
    'phân cứng': 'tao_bon',
    'phân có máu': 'phan_co_mau',
    'đi cầu ra máu': 'phan_co_mau',
    'phân lẫn máu': 'phan_co_mau',
    'phân đen': 'phan_den',
    'đi cầu phân đen': 'phan_den',
    'phân màu đen': 'phan_den',
    'nuốt nghẹn': 'nuot_nghen',
    'nghẹn khi nuốt': 'nuot_nghen',
    'cảm giác nghẹn': 'nuot_nghen',
    'cảm giác no sớm': 'cam_giac_no_som',
    'no nhanh': 'cam_giac_no_som',
    'ăn ít đã no': 'cam_giac_no_som',
    'đau thượng vị': 'dau_thuong_vi',
    'đau vùng thượng vị': 'dau_thuong_vi',
    'đau trên rốn': 'dau_thuong_vi',
    'đau quanh bụng': 'dau_quan_bung',
    'đau quanh vùng bụng': 'dau_quan_bung',
    'đau khắp bụng': 'dau_quan_bung',
    'ngứa hậu môn': 'ngua_hau_mon',
    'hậu môn ngứa': 'ngua_hau_mon',
    'ngứa vùng hậu môn': 'ngua_hau_mon',
    'vàng da': 'vang_da',
    'da vàng': 'vang_da',
    'vàng da vàng mắt': 'vang_da',
    'vàng mắt': 'vang_mat',
    'mắt vàng': 'vang_mat',
    'tròng mắt vàng': 'vang_mat',
    'nước tiểu sẫm màu': 'nuoc_tieu_sam_mau',
    'tiểu sẫm': 'nuoc_tieu_sam_mau',
    'nước tiểu đậm màu': 'nuoc_tieu_sam_mau',
    'hơi thở hôi': 'hoi_tho_hoi',
    'miệng hôi': 'hoi_tho_hoi',
    'hơi thở có mùi': 'hoi_tho_hoi',
    'nóng rát vùng bụng': 'nong_rat_vung_bung',
    'rát vùng bụng': 'nong_rat_vung_bung',
    'bụng nóng rát': 'nong_rat_vung_bung',
    'đau sau ăn': 'dau_sau_an',
    'đau bụng sau ăn': 'dau_sau_an',
    'đau sau khi ăn': 'dau_sau_an',
    'đau khi đại tiện': 'dau_khi_dai_tien',
    'đau lúc đi cầu': 'dau_khi_dai_tien',
    'đau khi đi ngoài': 'dau_khi_dai_tien',
    'đau đầu': 'dau_dau',
    'nhức đầu': 'dau_dau',
    'đầu đau': 'dau_dau',
    'mất thăng bằng': 'mat_thang_bang',
    'khó giữ thăng bằng': 'mat_thang_bang',
    'đi đứng không vững': 'mat_thang_bang',
    'tê tay chân': 'te_tay_chan',
    'tay chân tê': 'te_tay_chan',
    'tê bì tay chân': 'te_tay_chan',
    'yếu liệt cơ': 'yeu_liet_co',
    'cơ yếu': 'yeu_liet_co',
    'liệt cơ': 'yeu_liet_co',
    'co giật': 'co_giat',
    'giật cơ': 'co_giat',
    'cơ thể co giật': 'co_giat',
    'run tay chân': 'run_tay_chan',
    'tay chân run': 'run_tay_chan',
    'run tay': 'run_tay',
    'run rẩy': 'run_tay_chan',
    'tăng huyết áp': 'tang_huyet_ap',
    'huyết áp cao': 'tang_huyet_ap',
    'cao huyết áp': 'tang_huyet_ap',
    'mất ngủ': 'mat_ngu',
    'khó ngủ': 'mat_ngu',
    'ngủ không ngon': 'mat_ngu',
    'ngủ lì bì': 'ngu_li_bi',
    'ngáp suốt': 'ngu_li_bi',
    'ngủ nhiều': 'ngu_li_bi',
    'lú lẫn': 'lu_lan',
    'tinh thần lú lẫn': 'lu_lan',
    'đầu óc mơ hồ': 'lu_lan',
    'mất trí nhớ': 'mat_tri_nho',
    'quên nhiều': 'mat_tri_nho',
    'hay quên': 'mat_tri_nho',
    'nói khó': 'noi_kho',
    'khó nói': 'noi_kho',
    'nói không rõ': 'noi_kho',
    'nuốt khó': 'nuot_kho',
    'khó nuốt thức ăn': 'nuot_kho',
    'nuốt không trôi': 'nuot_kho',
    'mất ý thức': 'mat_y_thuc',
    'hôn mê': 'mat_y_thuc',
    'ngất đi': 'mat_y_thuc',
    'nhìn đôi': 'nhin_doi',
    'nhìn một thành hai': 'nhin_doi',
    'nhìn mờ đôi': 'nhin_doi',
    'rối loạn thị giác': 'roi_loan_thi_giac',
    'mắt nhìn mờ': 'roi_loan_thi_giac',
    'thị lực kém': 'roi_loan_thi_giac',
    'rối loạn vận động': 'roi_loan_van_dong',
    'vận động khó': 'roi_loan_van_dong',
    'đi lại khó khăn': 'roi_loan_van_dong',
    'đau dây thần kinh': 'dau_day_than_kinh',
    'đau nhói thần kinh': 'dau_day_than_kinh',
    'đau thần kinh': 'dau_day_than_kinh',
    'mất cảm giác': 'mat_cam_giac',
    'không cảm nhận được': 'mat_cam_giac',
    'mất cảm giác tay chân': 'mat_cam_giac',
    'rối loạn hành vi': 'roi_loan_hanh_vi',
    'hành vi bất thường': 'roi_loan_hanh_vi',
    'hành động lạ': 'roi_loan_hanh_vi',
    'lo âu': 'lo_au',
    'lo lắng': 'lo_au',
    'bồn chồn': 'lo_au',
    'trầm cảm': 'tram_cam',
    'buồn bã': 'tram_cam',
    'chán nản': 'tram_cam',
    'rối loạn cảm xúc': 'roi_loan_cam_xuc',
    'cảm xúc bất ổn': 'roi_loan_cam_xuc',
    'hay cáu gắt': 'roi_loan_cam_xuc',
    'đau khớp': 'dau_khop',
    'khớp đau': 'dau_khop',
    'nhức khớp': 'dau_khop',
    'sưng khớp': 'sung_khop',
    'khớp sưng': 'sung_khop',
    'khớp sưng đỏ': 'sung_khop',
    'cứng khớp': 'cung_khop',
    'khớp cứng': 'cung_khop',
    'khó cử động khớp': 'cung_khop',
    'viêm khớp': 'viem_khop',
    'khớp viêm': 'viem_khop',
    'khớp bị viêm': 'viem_khop',
    'đau cơ': 'dau_co',
    'cơ đau': 'dau_co',
    'nhức cơ': 'dau_co',
    'yếu cơ': 'yeu_co',
    'cơ yếu': 'yeu_co',
    'mất sức cơ': 'yeu_co',
    'chuột rút': 'chuot_rut',
    'co rút cơ': 'chuot_rut',
    'chuột rút tay chân': 'chuot_rut',
    'teo cơ': 'teo_co',
    'cơ teo': 'teo_co',
    'cơ nhỏ lại': 'teo_co',
    'đau lưng': 'dau_lung',
    'lưng đau': 'dau_lung',
    'nhức lưng': 'dau_lung',
    'đau cổ': 'dau_co',
    'cổ đau': 'dau_co',
    'nhức cổ': 'dau_co',
    'đau vai gáy': 'dau_vai_gay',
    'vai gáy đau': 'dau_vai_gay',
    'nhức vai gáy': 'dau_vai_gay',
    'tê tay': 'te_tay',
    'tay tê': 'te_tay',
    'tê bì tay': 'te_tay',
    'tê chân': 'te_chan',
    'chân tê': 'te_chan',
    'tê bì chân': 'te_chan',
    'hạn chế vận động': 'han_che_van_dong',
    'khó vận động': 'han_che_van_dong',
    'vận động hạn chế': 'han_che_van_dong',
    'khó đi lại': 'kho_di_lai',
    'đi lại khó': 'kho_di_lai',
    'đi đứng khó khăn': 'kho_di_lai',
    'mất sức cầm nắm': 'mat_suc_cam_nam',
    'tay yếu': 'mat_suc_cam_nam',
    'khó cầm đồ vật': 'mat_suc_cam_nam',
    'khớp kêu': 'khop_keu',
    'kêu lạo xạo': 'khop_keu',
    'khớp phát ra tiếng': 'khop_keu',
    'biến dạng khớp': 'bien_dang_khop',
    'khớp biến dạng': 'bien_dang_khop',
    'khớp méo mó': 'bien_dang_khop',
    'gãy xương tái phát': 'gay_xuong_tai_phat',
    'xương gãy lại': 'gay_xuong_tai_phat',
    'gãy xương nhiều lần': 'gay_xuong_tai_phat',
    'tăng cân': 'tang_can',
    'béo lên': 'tang_can',
    'cân nặng tăng': 'tang_can',
    'béo phì': 'tang_can',
    'khát nhiều': 'khat_nhieu',
    'hay khát nước': 'khat_nhieu',
    'uống nước nhiều': 'khat_nhieu',
    'khát nước liên tục': 'khat_nhieu',
    'tiểu nhiều': 'tieu_nhieu',
    'đi tiểu nhiều': 'tieu_nhieu',
    'tiểu thường xuyên': 'tieu_nhieu',
    'đi tiểu liên tục': 'tieu_nhieu',
    'tiểu đêm': 'tieu_dem',
    'đi tiểu đêm': 'tieu_dem',
    'tiểu nhiều vào ban đêm': 'tieu_dem',
    'rối loạn kinh nguyệt': 'roi_loan_kinh_nguyet',
    'kinh nguyệt không đều': 'roi_loan_kinh_nguyet',
    'mất kinh': 'roi_loan_kinh_nguyet',
    'kinh nguyệt bất thường': 'roi_loan_kinh_nguyet',
    'lạnh tay chân': 'lanh_tay_chan',
    'tay chân lạnh': 'lanh_tay_chan',
    'tay chân mát lạnh': 'lanh_tay_chan',
    'da khô': 'da_kho',
    'khô da': 'da_kho',
    'da khô ráp': 'da_kho',
    'rụng tóc': 'rung_toc',
    'tóc rụng': 'rung_toc',
    'rụng tóc nhiều': 'rung_toc',
    'run tay': 'run_tay',
    'tay run': 'run_tay',
    'tay run rẩy': 'run_tay',
    'đổ mồ hôi nhiều': 'do_mo_hoi_nhieu',
    'mồ hôi ra nhiều': 'do_mo_hoi_nhieu',
    'ra mồ hôi liên tục': 'do_mo_hoi_nhieu',
    'hồi hộp': 'hoi_hop',
    'tim hồi hộp': 'hoi_hop',
    'lo lắng hồi hộp': 'hoi_hop',
    'giảm ham muốn': 'giam_ham_muon',
    'mất ham muốn': 'giam_ham_muon',
    'không ham muốn': 'giam_ham_muon',
    'phù mặt': 'phu_mat',
    'mặt phù': 'phu_mat',
    'mặt sưng phù': 'phu_mat',
    'rụng lông mày': 'rung_long_may',
    'lông mày rụng': 'rung_long_may',
    'mất lông mày': 'rung_long_may',
    'da sạm': 'da_sam',
    'sạm da': 'da_sam',
    'da tối màu': 'da_sam',
    'ớn lạnh': 'on_lanh',
    'lạnh run': 'on_lanh',
    'cảm giác ớn lạnh': 'on_lanh',
    'phát ban': 'phat_ban',
    'nổi mẩn': 'phat_ban',
    'da nổi ban': 'phat_ban',
    'nổi mẩn đỏ': 'phat_ban',
    'nổi hạch': 'noi_hach',
    'hạch sưng': 'noi_hach',
    'sưng hạch': 'noi_hach',
    'ngứa da': 'ngua_da',
    'da ngứa': 'ngua_da',
    'ngứa khắp người': 'ngua_da',
    'sốt kéo dài': 'sot_keo_dai',
    'sốt lâu ngày': 'sot_keo_dai',
    'sốt dai dẳng': 'sot_keo_dai',
    'loét miệng': 'loet_mieng',
    'miệng loét': 'loet_mieng',
    'nhiệt miệng': 'loet_mieng',
    'rối loạn tiêu hóa': 'roi_loan_tieu_hoa',
    'tiêu hóa kém': 'roi_loan_tieu_hoa',
    'đầy bụng khó tiêu': 'roi_loan_tieu_hoa',
    'viêm họng': 'viem_hong',
    'họng viêm': 'viem_hong',
    'đau họng viêm': 'viem_hong',
    'đau họng': 'dau_hong',
    'họng đau': 'dau_hong',
    'nhức họng': 'dau_hong',
    'đau bụng dưới': 'dau_bung_duoi',
    'đau dưới bụng': 'dau_bung_duoi',
    'đau vùng bụng dưới': 'dau_bung_duoi',
    'tiểu buốt': 'tieu_buot',
    'đái buốt': 'tieu_buot',
    'tiểu đau buốt': 'tieu_buot',
    'tiểu khó': 'tieu_kho',
    'khó tiểu': 'tieu_kho',
    'tiểu không ra': 'tieu_kho',
    'nước tiểu có màu': 'nuoc_tieu_co_mau',
    'tiểu màu lạ': 'nuoc_tieu_co_mau',
    'nước tiểu bất thường': 'nuoc_tieu_co_mau',
    'sưng chân': 'sung_chan',
    'chân sưng': 'sung_chan',
    'chân phù': 'sung_chan',
    'tiểu ra bọt': 'tieu_ra_bot',
    'nước tiểu có bọt': 'tieu_ra_bot',
    'tiểu bọt': 'tieu_ra_bot',
    'đau khi tiểu': 'dau_khi_tieu',
    'đau lúc đi tiểu': 'dau_khi_tieu',
    'tiểu đau': 'dau_khi_tieu',
    'tiểu ít': 'tieu_it',
    'ít tiểu': 'tieu_it',
    'đi tiểu ít': 'tieu_it',
    'mất nước': 'mat_nuoc',
    'cơ thể mất nước': 'mat_nuoc',
    'khô nước': 'mat_nuoc'
}

# Từ điển ánh xạ triệu chứng sang từ khóa (dùng để tạo dữ liệu)
SYMPTOM_TO_KEYWORDS = {
    'kho_tho': ['khó thở', 'thở khó', 'hụt hơi'],
    'tuc_nguc': ['tức ngực', 'đau tức ngực', 'ngực bị tức'],
    'ho': ['ho', 'ho nhiều', 'ho khan', 'ho có đờm'],
    'met_moi': ['mệt mỏi', 'mệt', 'uể oải', 'thiếu sức sống'],
    'buon_non': ['buồn nôn', 'nôn nao', 'muốn ói'],
    'chan_an': ['chán ăn', 'không muốn ăn', 'mất ngon miệng'],
    'tim_dap_nhanh': ['tim đập nhanh', 'hồi hộp', 'tim đập mạnh'],
    'tho_nhanh': ['thở nhanh', 'thở gấp', 'hơi thở nhanh'],
    'chong_mat': ['chóng mặt', 'hoa mắt', 'đầu óc quay cuồng'],
    'ngat_xiu': ['ngất xỉu', 'mất ý thức', 'ngất'],
    'phu_ne': ['phù nề', 'sưng phù', 'phù chân', 'phù toàn thân'],
    'kho_khe': ['khò khè', 'thở khò khè', 'tiếng thở khò khè'],
    'ho_ra_mau': ['ho ra máu', 'đờm có máu', 'ho kèm máu'],
    'sot': ['sốt', 'nóng sốt', 'sốt cao', 'sốt nhẹ'],
    'sut_can': ['sút cân', 'giảm cân', 'gầy đi', 'sụt cân không rõ lý do'],
    'ra_mo_hoi_dem': ['ra mồ hôi đêm', 'đổ mồ hôi đêm', 'mồ hôi đêm nhiều'],
    'ngay_to': ['ngáy to', 'ngáy lớn', 'ngáy khi ngủ'],
    'ngung_tho_khi_ngu': ['ngưng thở khi ngủ', 'ngừng thở lúc ngủ', 'ngưng thở'],
    'kho_nuot': ['khó nuốt', 'nuốt khó', 'cảm giác khó nuốt'],
    'dom_dac': ['đờm đặc', 'đờm dính', 'đờm khó khạc'],
    'nang_nguc': ['nặng ngực', 'ngực nặng', 'cảm giác nặng ngực'],
    'tho_rit': ['thở rít', 'tiếng thở rít', 'hơi thở rít'],
    'dau_bung': ['đau bụng', 'bụng đau', 'đau vùng bụng', 'đau bụng âm ỉ'],
    'day_hoi': ['đầy hơi', 'bụng đầy', 'chướng bụng'],
    'o_chua': ['ợ chua', 'ợ nóng', 'ợ lên chua'],
    'o_nong': ['ợ nóng', 'nóng rát ngực', 'ợ lên nóng'],
    'non_mua': ['nôn mửa', 'ói mửa', 'nôn nhiều'],
    'tieu_chay': ['tiêu chảy', 'đi ngoài phân lỏng', 'đi tiêu lỏng', 'tiêu chảy nhẹ'],
    'tao_bon': ['táo bón', 'khó đi cầu', 'phân cứng'],
    'phan_co_mau': ['phân có máu', 'đi cầu ra máu', 'phân lẫn máu'],
    'phan_den': ['phân đen', 'đi cầu phân đen', 'phân màu đen'],
    'nuot_nghen': ['nuốt nghẹn', 'nghẹn khi nuốt', 'cảm giác nghẹn'],
    'cam_giac_no_som': ['cảm giác no sớm', 'no nhanh', 'ăn ít đã no'],
    'dau_thuong_vi': ['đau thượng vị', 'đau vùng thượng vị', 'đau trên rốn'],
    'dau_quan_bung': ['đau quanh bụng', 'đau quanh vùng bụng', 'đau khắp bụng'],
    'ngua_hau_mon': ['ngứa hậu môn', 'hậu môn ngứa', 'ngứa vùng hậu môn'],
    'vang_da': ['vàng da', 'da vàng', 'vàng da vàng mắt'],
    'vang_mat': ['vàng mắt', 'mắt vàng', 'tròng mắt vàng'],
    'nuoc_tieu_sam_mau': ['nước tiểu sẫm màu', 'tiểu sẫm', 'nước tiểu đậm màu'],
    'hoi_tho_hoi': ['hơi thở hôi', 'miệng hôi', 'hơi thở có mùi'],
    'nong_rat_vung_bung': ['nóng rát vùng bụng', 'rát vùng bụng', 'bụng nóng rát'],
    'dau_sau_an': ['đau sau ăn', 'đau bụng sau ăn', 'đau sau khi ăn'],
    'dau_khi_dai_tien': ['đau khi đại tiện', 'đau lúc đi cầu', 'đau khi đi ngoài'],
    'dau_dau': ['đau đầu', 'nhức đầu', 'đầu đau'],
    'mat_thang_bang': ['mất thăng bằng', 'khó giữ thăng bằng', 'đi đứng không vững'],
    'te_tay_chan': ['tê tay chân', 'tay chân tê', 'tê bì tay chân'],
    'yeu_liet_co': ['yếu liệt cơ', 'cơ yếu', 'liệt cơ'],
    'co_giat': ['co giật', 'giật cơ', 'cơ thể co giật'],
    'run_tay_chan': ['run tay chân', 'tay chân run', 'run rẩy'],
    'mat_ngu': ['mất ngủ', 'khó ngủ', 'ngủ không ngon'],
    'ngu_li_bi': ['ngủ lì bì', 'ngủ nhiều', 'ngáp suốt'],
    'lu_lan': ['lú lẫn', 'tinh thần lú lẫn', 'đầu óc mơ hồ'],
    'mat_tri_nho': ['mất trí nhớ', 'quên nhiều', 'hay quên'],
    'noi_kho': ['nói khó', 'khó nói', 'nói không rõ'],
    'nuot_kho': ['nuốt khó', 'khó nuốt thức ăn', 'nuốt không trôi'],
    'mat_y_thuc': ['mất ý thức', 'hôn mê', 'ngất đi'],
    'nhin_doi': ['nhìn đôi', 'nhìn một thành hai', 'nhìn mờ đôi'],
    'roi_loan_thi_giac': ['rối loạn thị giác', 'mắt nhìn mờ', 'thị lực kém'],
    'roi_loan_van_dong': ['rối loạn vận động', 'vận động khó', 'đi lại khó khăn'],
    'dau_day_than_kinh': ['đau dây thần kinh', 'đau nhói thần kinh', 'đau thần kinh'],
    'mat_cam_giac': ['mất cảm giác', 'không cảm nhận được', 'mất cảm giác tay chân'],
    'roi_loan_hanh_vi': ['rối loạn hành vi', 'hành vi bất thường', 'hành động lạ'],
    'lo_au': ['lo âu', 'lo lắng', 'bồn chồn'],
    'tram_cam': ['trầm cảm', 'buồn bã', 'chán nản'],
    'roi_loan_cam_xuc': ['rối loạn cảm xúc', 'cảm xúc bất ổn', 'hay cáu gắt'],
    'dau_khop': ['đau khớp', 'khớp đau', 'nhức khớp'],
    'sung_khop': ['sưng khớp', 'khớp sưng', 'khớp sưng đỏ'],
    'cung_khop': ['cứng khớp', 'khớp cứng', 'khó cử động khớp'],
    'viem_khop': ['viêm khớp', 'khớp viêm', 'khớp bị viêm'],
    'dau_co': ['đau cơ', 'cơ đau', 'nhức cơ'],
    'yeu_co': ['yếu cơ', 'cơ yếu', 'mất sức cơ'],
    'chuot_rut': ['chuột rút', 'co rút cơ', 'chuột rút tay chân'],
    'teo_co': ['teo cơ', 'cơ teo', 'cơ nhỏ lại'],
    'dau_lung': ['đau lưng', 'lưng đau', 'nhức lưng'],
    'dau_co': ['đau cổ', 'cổ đau', 'nhức cổ'],
    'dau_vai_gay': ['đau vai gáy', 'vai gáy đau', 'nhức vai gáy'],
    'te_tay': ['tê tay', 'tay tê', 'tê bì tay'],
    'te_chan': ['tê chân', 'chân tê', 'tê bì chân'],
    'han_che_van_dong': ['hạn chế vận động', 'khó vận động', 'vận động hạn chế'],
    'kho_di_lai': ['khó đi lại', 'đi lại khó', 'đi đứng khó khăn'],
    'mat_suc_cam_nam': ['mất sức cầm nắm', 'tay yếu', 'khó cầm đồ vật'],
    'khop_keu': ['khớp kêu', 'kêu lạo xạo', 'khớp phát ra tiếng'],
    'bien_dang_khop': ['biến dạng khớp', 'khớp biến dạng', 'khớp méo mó'],
    'gay_xuong_tai_phat': ['gãy xương tái phát', 'xương gãy lại', 'gãy xương nhiều lần'],
    'tang_can': ['tăng cân', 'béo lên', 'cân nặng tăng', 'béo phì'],
    'khat_nhieu': ['khát nhiều', 'hay khát nước', 'uống nước nhiều', 'khát nước liên tục'],
    'tieu_nhieu': ['tiểu nhiều', 'đi tiểu nhiều', 'tiểu thường xuyên', 'đi tiểu liên tục'],
    'tieu_dem': ['tiểu đêm', 'đi tiểu đêm', 'tiểu nhiều vào ban đêm'],
    'roi_loan_kinh_nguyet': ['rối loạn kinh nguyệt', 'kinh nguyệt không đều', 'mất kinh', 'kinh nguyệt bất thường'],
    'lanh_tay_chan': ['lạnh tay chân', 'tay chân lạnh', 'tay chân mát lạnh'],
    'da_kho': ['da khô', 'khô da', 'da khô ráp'],
    'rung_toc': ['rụng tóc', 'tóc rụng', 'rụng tóc nhiều'],
    'run_tay': ['run tay', 'tay run', 'tay run rẩy'],
    'do_mo_hoi_nhieu': ['đổ mồ hôi nhiều', 'mồ hôi ra nhiều', 'ra mồ hôi liên tục'],
    'hoi_hop': ['hồi hộp', 'tim hồi hộp', 'lo lắng hồi hộp'],
    'giam_ham_muon': ['giảm ham muốn', 'mất ham muốn', 'không ham muốn'],
    'phu_mat': ['phù mặt', 'mặt phù', 'mặt sưng phù'],
    'rung_long_may': ['rụng lông mày', 'lông mày rụng', 'mất lông mày'],
    'tang_huyet_ap': ['tăng huyết áp', 'huyết áp cao', 'cao huyết áp'],
    'da_sam': ['da sạm', 'sạm da', 'da tối màu'],
    'on_lanh': ['ớn lạnh', 'lạnh run', 'cảm giác ớn lạnh'],
    'phat_ban': ['phát ban', 'nổi mẩn', 'da nổi ban', 'nổi mẩn đỏ'],
    'noi_hach': ['nổi hạch', 'hạch sưng', 'sưng hạch'],
    'ngua_da': ['ngứa da', 'da ngứa', 'ngứa khắp người'],
    'sot_keo_dai': ['sốt kéo dài', 'sốt lâu ngày', 'sốt dai dẳng'],
    'loet_mieng': ['loét miệng', 'miệng loét', 'nhiệt miệng'],
    'roi_loan_tieu_hoa': ['rối loạn tiêu hóa', 'tiêu hóa kém', 'đầy bụng khó tiêu'],
    'viem_hong': ['viêm họng', 'họng viêm', 'đau họng viêm'],
    'dau_hong': ['đau họng', 'họng đau', 'nhức họng'],
    'dau_bung_duoi': ['đau bụng dưới', 'đau dưới bụng', 'đau vùng bụng dưới'],
    'tieu_buot': ['tiểu buốt', 'đái buốt', 'tiểu đau buốt'],
    'tieu_kho': ['tiểu khó', 'khó tiểu', 'tiểu không ra'],
    'nuoc_tieu_co_mau': ['nước tiểu có màu', 'tiểu màu lạ', 'nước tiểu bất thường'],
    'sung_chan': ['sưng chân', 'chân sưng', 'chân phù'],
    'tieu_ra_bot': ['tiểu ra bọt', 'nước tiểu có bọt', 'tiểu bọt'],
    'dau_khi_tieu': ['đau khi tiểu', 'đau lúc đi tiểu', 'tiểu đau'],
    'tieu_it': ['tiểu ít', 'ít tiểu', 'đi tiểu ít'],
    'mat_nuoc': ['mất nước', 'cơ thể mất nước', 'khô nước']
}