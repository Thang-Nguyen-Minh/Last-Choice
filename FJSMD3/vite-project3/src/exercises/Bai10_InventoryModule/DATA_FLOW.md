# Inventory Module Data Flow

1. TanStack Query gọi `fetchInventory` để lấy danh sách kho từ server state.
2. Người dùng chọn một dòng hàng hóa.
3. Zustand `useInventoryUiStore` lưu `selectedItem` để mở sidebar.
4. Sidebar giữ quantity draft cục bộ để người dùng chỉnh số lượng.
5. Bấm Lưu gọi mutation `updateInventoryQuantity`.
6. Thành công: invalidate query `inventory`, đóng sidebar bằng Zustand.
7. Lỗi: số lượng âm bị chặn ở client; số lượng quá hạn mức hiển thị lỗi API và giữ sidebar mở.
