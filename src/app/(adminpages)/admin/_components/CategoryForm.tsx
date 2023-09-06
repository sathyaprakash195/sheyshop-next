import { Button, Form, Modal, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { SetLoading } from "@/redux/LoadersSlice";
import axios from "axios";
import { getCatchErrorMessage } from "@/helpers/ErrorMessgaes";
import ModelTitle from "@/components/ModelTitle";
import { ProductType } from "@/interfaces";

function CategoryForm({
  showCategoryForm,
  setShowCategoryForm,
  selectedCategory,
  setSelectedCategory,
  reloadCategories,
}: CategoryFormProps) {
  const dispatch = useDispatch();
  const onFinish = async (values: ProductType) => {
    try {
      dispatch(SetLoading(true));
      let response;
      if (selectedCategory) {
        response = await axios.put(
          `/api/admin/categories/${selectedCategory._id}`,
          values
        );
      } else {
        response = await axios.post("/api/admin/categories", values);
      }
      message.success("Category Added Successfully");
      setShowCategoryForm(false);
      reloadCategories();
      setSelectedCategory(null);
    } catch (error : any) {
      message.error(getCatchErrorMessage(error));
    } finally {
      dispatch(SetLoading(false));
    }
  };
  const modelTitle = selectedCategory ? "Edit Category" : "Add Category";
  return (
    <Modal
      title={<ModelTitle title={modelTitle} />}
      open={showCategoryForm}
      onCancel={() => {
        setShowCategoryForm(false);
        setSelectedCategory(null);
      }}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={selectedCategory}
        className="flex flex-col gap-5"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <input type="text" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input your description!",
            },
          ]}
        >
          <textarea rows={5}></textarea>
        </Form.Item>

        <div className="flex justify-end gap-5">
          <Button onClick={() => setShowCategoryForm(false)}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default CategoryForm;

export interface CategoryFormProps {
  showCategoryForm: boolean;
  setShowCategoryForm: any;
  selectedCategory: any;
  setSelectedCategory: any;
  reloadCategories: any;
}
