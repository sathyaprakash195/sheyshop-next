import { getCatchErrorMessage } from "@/helpers/ErrorMessgaes";
import { SetLoading } from "@/redux/LoadersSlice";
import { Button, Table, message } from "antd";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import CategoryForm from "./CategoryForm";
import DeleteButton from "@/components/DeleteButton";
import EditButton from "@/components/EditButton";
import { CatchBlockErrorType, CategoryType } from "@/interfaces";

function CategoriesList() {
  const [showCategoryForm, setShowCategoryForm] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<CategoryType>();
  const dispatch = useDispatch();
  const [categories, setCategories] = React.useState<CategoryType[]>([]);
  const getCategories = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get("/api/admin/categories");
      setCategories(response.data.data);
    } catch (error : any) {
      message.error(getCatchErrorMessage(error));
    } finally {
      dispatch(SetLoading(false));
    }
  };
  React.useEffect(() => {
    getCategories();
  }, []);

  const onDelete = async (id: string) => {
    try {
      dispatch(SetLoading(true));
      await axios.delete(`/api/admin/categories/${id}`);
      message.success("Category Deleted Successfully");
      getCategories();
    } catch (error : any) {
      message.error(getCatchErrorMessage(error));
    } finally {
      dispatch(SetLoading(false));
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (createdAt: string) => {
        return new Date(createdAt).toLocaleDateString();
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text: string, record: CategoryType) => {
        return (
          <div className="flex gap-2 text-white">
            <DeleteButton title="Delete" onClick={() => onDelete(record._id)} />
            <EditButton
              title="Edit"
              onClick={() => {
                setSelectedCategory(record);
                setShowCategoryForm(true);
              }}
            />
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <div className="flex justify-end">
        <Button
          type="primary"
          onClick={() => {
            setShowCategoryForm(true);
            setSelectedCategory(undefined);
          }}
        >
          Add Category
        </Button>
      </div>

      <div className="mt-5">
        <Table columns={columns} dataSource={categories} />
      </div>

      {showCategoryForm && (
        <CategoryForm
          showCategoryForm={showCategoryForm}
          setShowCategoryForm={setShowCategoryForm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          reloadCategories={getCategories}
        />
      )}
    </div>
  );
}

export default CategoriesList;
