import CreateProductForm from "../components/CreateProduct";

const CreateProductPage = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">Create New Product</h1>
      <CreateProductForm />
    </div>
  );
};

export default CreateProductPage;
