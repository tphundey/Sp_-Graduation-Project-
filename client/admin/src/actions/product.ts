import { instance } from "@/axios/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProduct = createAsyncThunk(
    'product/getProduct',
    async () => {
      try {
        const data = await instance.get(`/product`);
        // Đảo ngược mảng dữ liệu trước khi trả về
        return data.reverse();
      } catch (error) {
        throw error;
      }
    }
  );
export const getProductById = createAsyncThunk(
    'product/getProductById',
    async (id, { rejectWithValue }) => {
        try {
            // Gọi API để lấy sản phẩm với ID tương ứng
            const response = await instance.get(`/product/${id}`); // Thay đổi đường dẫn và phương thức HTTP tùy thuộc vào API của bạn

            // Trả về dữ liệu sản phẩm nếu thành công
            return response.data;
        } catch (error) {
            // Xử lý lỗi nếu có
            // Thông thường, nếu API trả về lỗi 404 (không tìm thấy sản phẩm), ta sẽ sử dụng rejectWithValue để truyền thông tin lỗi về cho reducer
            return rejectWithValue(error);
        }
    }
);
export const addProduct = createAsyncThunk(
    'product/addProduct',
    async (product) => {
        try {
            const data = await instance.post(`/product`, product);
            return data;
        } catch (error) {

        }
    }
);
export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async (product) => {
        try {
            const data = await instance.patch(`/product/${product.id}`, product);
            return data;
        } catch (error) {

        }
    }
);
export const removeProduct = createAsyncThunk(
    'product/fetchProducts',
    async (id) => {
        try {
            const confirm = window.confirm("Bạn có chắc xóa chứ!");
            if(confirm) {
                await instance.delete(`/product/${id}`);
                alert(`Xóa thành công`);
            }else {
                // If the user cancels the deletion, return early without doing anything
                return;
            }
            
            return id;
        } catch (error) {

        }
    }
);

