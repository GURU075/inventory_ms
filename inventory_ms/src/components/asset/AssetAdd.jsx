import React, { useState, useEffect } from "react";
import { httpClient } from "../../config";

const AssetAdd = ({ isAddPopupOpen, setIsAddPopupOpen }) => {
    const [formData, setFormData] = useState({
        assetId: "",
        assetDesc: "",
        amcStartDate: "",
        amcEndDate: "",
        assetAllocationTo: "",
        categoryId: "",
        locationId: "",
        subCategoryId: "",
        allocationType: "",


    });
    const [selectedCategory, setSelectedCategory] = useState("");
    const [fieldConfig, setFieldConfig] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [location, setLocation] = useState([]);

    // const [CategoryProperties, setCategoryProperties] = useState([]);
    // const [allocationType, setAllocationType] = useState("");

    const [CategoryProperties, setCategoryProperties] = useState([]);
    const [CategoryPropertie, setCategoryPropertie] = useState("");
    const [allocationType, setAllocationType] = useState("");
    const [users, SetUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [departments, SetDepartments] = useState([]);
    const [department, setDepartment] = useState(null);

    const handleAllocationTypeChange = async (e) => {
        const selectedType = e.target.value;
        setAllocationType(selectedType);

        try {
            if (selectedType === "User") {
                const response = await httpClient.get("/User/getAllUsers");
                SetUsers(response.data);
            } else if (selectedType === "Group") {
                const response = await httpClient.get("/Department/getAllDepartments");
                SetDepartments(response.data);
            }
        } catch (error) {
            console.error(`Error fetching data for ${selectedType}:`, error);
            alert(`Failed to fetch ${selectedType === "User" ? "users" : "departments"}. Please try again.`);
        }
    };


    const handleAddAsset = async () => {
        try {
            const requestPayload = {
                assetDesc: formData.assetDesc.trim(),
                amcStartDate: formData.amcStartDate,
                amcEndDate: formData.amcEndDate,
                assetAllocationTo: formData.assetAllocationTo,
                assetAllocationDate: new Date().toISOString().split('T')[0],
                allocationType: allocationType.trim(),
                location: {
                    locationId: formData.locationId,
                },
                category: {
                    categoryId: selectedCategory,
                },
                subCategory: {
                    subCategoryId: formData.subCategoryId,
                }
            };

            const response = await httpClient.post(`/Asset/addAsset`, requestPayload);
            if (response.data) {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    ...response.data,
                }));
                setIsAddPopupOpen(false);
            } else {
                throw new Error("Unexpected API response structure");
            }
        } catch (error) {
            console.error("Error adding asset", error);
            alert("Failed to add asset. Please try again.");
        }
    };


    // useEffect(() => {
    //     httpClient
    //         .get("/Category/getAllCategories") // Replace with your actual API endpoint
    //         .then((response) => {
    //             setCategories(response.data); // Assuming API returns an array of category objects
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching categories:", error);
    //         });
    // }, []);
    // useEffect(() => {
    //     const fetchSubCategories = async () => {
    //         try {
    //             const response = await httpClient.get("/SubCategory/getAllSubCategories");
    //             setSubCategories(response.data);
    //         } catch (error) {
    //             console.error("Error fetching getAllSubCategories:", error);
    //         }
    //     };

    //     fetchSubCategories();
    // }, []);

    // useEffect(async () => {
    //     await httpClient
    //         .get("/Location/getAllLocations") // Replace with your actual API endpoint
    //         .then((response) => {
    //             setLocation(response.data); // Assuming API returns an array of category objects
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching getAllSubCategories:", error);
    //         });
    // }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesRes, subCategoriesRes, locationsRes] = await Promise.all([
                    httpClient.get("/Category/getAllCategories"),
                    httpClient.get("/SubCategory/getAllSubCategories"),
                    httpClient.get("/Location/getAllLocations"),
                ]);
                setCategories(categoriesRes.data);
                setSubCategories(subCategoriesRes.data);
                setLocation(locationsRes.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleSelectionChange = (selectedId) => {
        if (allocationType === "User" && users.length) {
            const selectedUser = users.find((u) => u.userId.toString() === selectedId);
            setUser(selectedUser);
            setFormData({ ...formData, assetAllocationTo: selectedUser?.userId || "" });
        } else if (allocationType === "Group" && departments.length) {
            const selectedDepartment = departments.find((d) => d.deptId.toString() === selectedId);
            setDepartment(selectedDepartment);
            setFormData({ ...formData, assetAllocationTo: selectedDepartment?.deptId || "" });
        }
    };



    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const requests = CategoryProperties.map(async (property) => {
    //         const payload = {
    //             asset_property_name: property.categoryPropertyName,
    //             asset_property_value: formData[property.categoryPropertyName],
    //             asset_id: 1,
    //         };

    //         try {
    //             const response = await httpClient.post(
    //                 "/AssetPropertyDetail/addAssetPropertyDetail",
    //                 payload
    //             );

    //             if (response.status !== 200) {
    //                 throw new Error(`Failed to submit property: ${property.categoryPropertyName}`);
    //             }
    //             console.log(`Successfully submitted: ${property.categoryPropertyName}`);
    //         } catch (error) {
    //             console.error(`Error submitting property: ${property.categoryPropertyName}`, error);
    //         }
    //     });

    //     await Promise.all(requests);

    //     alert("All fields submitted successfully!");
    // };




    useEffect(() => {

        console.log('CategoryProperties', CategoryProperties);

    }, [CategoryProperties]);

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center">
            <div className="pl-10 pt-1 pb-1 pr-0.5 bg-white rounded-lg shadow-md  ">
                <div className="pr-5 w-[80rem] max-h-[80vh] overflow-y-auto">
                    <h2 className="text-xl font-bold mb-4">Add New Asset</h2>
                    <form>
                        <div className="grid gap-6 mb-6 md:grid-cols-2 ">
                            <div>
                                <label for="category" className="label-asset">Category</label>
                                <select
                                    id="category"
                                    className="input-field"
                                    value={selectedCategory} // Bind to state
                                    onChange={async (e) => {
                                        const selectedValue = e.target.value;
                                        setSelectedCategory(selectedValue); // Update state
                                        if (selectedValue) {
                                            // Call the API when a category is selected
                                            await httpClient
                                                .get(`/CategoryProperties/getAllCategoryProperties`)
                                                .then((response) => {
                                                    setCategoryProperties(response.data)
                                                    console.log("API Response:", response.data);
                                                })
                                                .catch((error) => {
                                                    console.error("Error fetching data:", error);
                                                });
                                        }
                                    }}

                                    required
                                >
                                    <option value="">-- Select Category --</option> {/* Default empty option */}
                                    {categories.map((category) => (
                                        <option key={category.categoryId} value={category.categoryId}>
                                            {category.categoryName}
                                        </option>
                                    ))}

                                </select>
                            </div>
                            <div>
                                <label className="label-asset">SubCategory</label>
                                <select
                                    id="category"
                                    className="input-field"
                                    onChange={(e) => setFormData({ ...formData, subCategoryId: e.target.value })}
                                    required
                                >
                                    <option value="">-- Select SubCategory --</option> {/* Default empty option */}
                                    {subCategories.map((subcategory) => (
                                        <option key={subcategory.subCategoryId} value={subcategory.subCategoryId}>{subcategory.subCategoryName}</option>
                                    ))}



                                </select>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="allocationType" className="label-asset">
                                    Allocation Type
                                </label>
                                <select
                                    id="allocationType"
                                    value={allocationType}
                                    onChange={handleAllocationTypeChange}
                                    className="input-field"
                                    required
                                >
                                    <option value="">-- Select Allocation Type --</option>
                                    <option value="Group">Group</option>
                                    <option value="User">User</option>
                                </select>
                            </div>
                            <div>
                                <label className="label-asset">
                                    {allocationType === "User" ? "User Name" : "Department Name"}
                                </label>
                                <select
                                    id={allocationType === "User" ? "user" : "department"}
                                    className="input-field"
                                    onChange={(e) => handleSelectionChange(e.target.value)} // Custom handler for extended functionality
                                    required
                                >
                                    <option value="">
                                        {allocationType === "User" ? "-- Select User --" : "-- Select Department --"}
                                    </option>
                                    {allocationType === "User"
                                        ? users.map((user) => (
                                            <option key={user.userId} value={user.userId}>
                                                {user.userName}
                                            </option>
                                        ))
                                        : departments.map((department) => (
                                            <option key={department.deptId} value={department.deptId}>
                                                {department.deptName}
                                            </option>
                                        ))}
                                </select>
                            </div>


                           


                            {allocationType === "User" && (
                                <>

                                    <div>
                                        <label className="label-asset">User Name</label>
                                        <select
                                            id="category"
                                            className="input-field"
                                            onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                                            required
                                        >
                                            <option value="">-- Select UserName --</option> {/* Default empty option */}
                                            {users.map((us) => (
                                                <option key="use.userId" value="us.userId">{us.userName}</option>
                                            ))}



                                        </select>
                                    </div>
                                    <div className="mb-6">
                                        <label className="label-asset">
                                            User Name
                                        </label>
                                        <input
                                            type="text"
                                            onChange={(e) => setFormData({ ...formData, assetAllocationTo: e.target.value })}
                                            id="Department_Name"
                                            className="input-field"
                                            placeholder="Department Name"
                                            required
                                        />
                                    </div>

                                </>
                            )}
                            <div>
                                <label className="label-asset">Allocated To</label>
                                <input
                                    type="text"
                                    id="Allocated_To"
                                    className="input-field"
                                    value={
                                        allocationType === "User"
                                            ? user?.userName || "" // Display user name if allocationType is "User"
                                            : allocationType === "Group"
                                                ? department?.deptName || "" // Display department name if allocationType is "Group"
                                                : "" // Default empty value
                                    }
                                    readOnly // Make the field read-only to prevent manual edits
                                />
                            </div>


                            <div>
                                <label className="label-asset">Description</label>
                                <input type="text"
                                    onChange={(e) => setFormData({ ...formData, assetDesc: e.target.value })}
                                    id="website" className="input-field" placeholder="Enter Designation" required />
                            </div>

                        </div>
                        <div className="grid gap-6 mb-6 md:grid-cols-3">
                        {allocationType === "Group" && (
                                <>

                                    <div className="mb-6">
                                        <label className="label-asset">
                                            Department Location
                                        </label>
                                        <input
                                            type="text"
                                            id="Department_Location"
                                            className="input-field"
                                            value={
                                                allocationType === "User"
                                                    ? user?.userCity || "" // Display user name if allocationType is "User"
                                                    : allocationType === "Group"
                                                        ? department?.deptName || "" // Display department name if allocationType is "Group"
                                                        : "" // Default empty value
                                            }
                                            required
                                        />
                                    </div>
                                </>
                            )}
                            {allocationType === "User" && (
                                <>
                                    <div className="mb-6">
                                        <label className="label-asset">
                                            User Desgnation
                                        </label>
                                        <input
                                            type="text"
                                            id="Department_Name"
                                            className="input-field"
                                            placeholder="Department Name"
                                            required
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="label-asset">
                                            User Location
                                        </label>
                                        <input
                                            type="text"
                                            id="Department_Location"
                                            className="input-field"
                                            placeholder="Department Location"
                                            required
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="label-asset">
                                            User Email
                                        </label>
                                        <input
                                            type="text"
                                            id="Department_Location"
                                            className="input-field"
                                            placeholder="Department Location"
                                            required
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="label-asset">
                                            User mobile No
                                        </label>
                                        <input
                                            type="text"
                                            id="Department_Location"
                                            className="input-field"
                                            placeholder="Department Location"
                                            required
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="label-asset">
                                            Department Name
                                        </label>
                                        <input
                                            type="text"
                                            id="Department_Name"
                                            className={`input-field`}
                                            placeholder="Department Name"
                                            required
                                        // ${hasError ? 'input-field-error' : ''}
                                        />
                                    </div>
                                </>
                            )}
                            <div>
                                <label className="label-asset">amcStartDate</label>
                                <input type="date"
                                    onChange={(e) => setFormData({ ...formData, amcStartDate: e.target.value })}
                                    id="visitors" className="input-field" placeholder="Enter emp name" required />
                            </div>
                            <div>
                                <label className="label-asset">amcEndDate</label>
                                <input type="date"
                                    onChange={(e) => setFormData({ ...formData, amcEndDate: e.target.value })}
                                    id="visitors" className="input-field" placeholder="Enter emp name" required />
                            </div>
                            <div>
                                <label className="label-asset">Asset Emp Name</label>
                                <input type="text" id="visitors" className="input-field" placeholder="Enter emp name" required />
                            </div>
                            {/* <div>
                            <label className="label-asset">Asset Emp Code</label>
                            <input type="text" id="visitors" className="input-field" placeholder="Enter emp name" required />
                        </div>
                        <div>
                            <label className="label-asset">Asset Emp Name</label>
                            <input type="text" id="visitors" className="input-field" placeholder="Enter emp name" required />
                        </div>
                        <div class="mb-6">
                            <label for="email" className="label-asset">Email address</label>
                            <input type="email" id="email" className="input-field" placeholder="Enter email" required />
                        </div> */}
                            <div>
                                <label className="label-asset">Location</label>
                                <select
                                    id="location"
                                    className="input-field"
                                    onChange={(e) => setFormData({ ...formData, locationId: e.target.value })}
                                    required
                                >
                                    <option value="">-- Select Location --</option>
                                    {location.map((loc) => (
                                        <option key={loc.locationId} value={loc.locationId}>
                                            {loc.locationName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* <div class="mb-6">
                            <label className="label-asset">Floor</label>
                            <input type="text" id="confirm_password" className="input-field" placeholder="Enter Floor" required />
                        </div> */}
                            {/* <div class="mb-6">
                            <label for="text" className="label-asset">Asset Status</label>
                            <input type="text" id="email" className="input-field" placeholder="Enter email" required />
                        </div> */}


                            {[...new Map(CategoryProperties.map((item) => [item.categoryPropertyName, item])).values()]
                                .map((obj, i) => (
                                    <div key={i} className="mb-6">
                                        <label
                                            htmlFor={obj.categoryPropertyName}
                                            className="label-asset"
                                        >
                                            {obj.categoryPropertyName}
                                        </label>
                                        <input
                                            type="text"
                                            name={obj.categoryPropertyName}
                                            id={obj.categoryPropertyName}
                                            className="input-field"
                                            placeholder={obj.categoryPropertyName}
                                            required={obj.categoryPropertyMandatory}
                                            value={formData[obj.categoryPropertyName] || ""}
                                            onChange={handleChange}
                                        />
                                    </div>
                                ))}


                            {/* <div class="mb-6">
                            <label  className="label-asset">Model</label>
                            <input type="text" id="password" className="input-field" placeholder="Enter Location" required />
                        </div>
                        <div class="mb-6">
                            <label className="label-asset">Serial No</label>
                            <input type="text" id="confirm_password" className="input-field" placeholder="Enter Floor" required />
                        </div>
                        <div class="mb-6">
                            <label for="email" className="label-asset">Make</label>
                            <input type="email" id="email" className="input-field" placeholder="Enter email" required />
                        </div>
                        <div class="mb-6">
                            <label  className="label-asset">Model</label>
                            <input type="text" id="password" className="input-field" placeholder="Enter Location" required />
                        </div>
                        <div class="mb-6">
                            <label className="label-asset">Serial No</label>
                            <input type="text" id="confirm_password" className="input-field" placeholder="Enter Floor" required />
                        </div>
                   
                        <div class="mb-6">
                            <label for="email" className="label-asset">Hard Disk</label>
                            <input type="email" id="email" className="input-field" placeholder="Enter email" required />
                        </div>
                        <div class="mb-6">
                            <label  className="label-asset">CPU</label>
                            <input type="text" id="password" className="input-field" placeholder="Enter Location" required />
                        </div>
                        <div class="mb-6">
                            <label className="label-asset">Monitor</label>
                            <input type="text" id="confirm_password" className="input-field" placeholder="Enter Floor" required />
                        </div>

                        <div class="mb-6">
                            <label for="email" className="label-asset">Keyboard</label>
                            <input type="email" id="email" className="input-field" placeholder="Enter email" required />
                        </div>
                        <div class="mb-6">
                            <label  className="label-asset">Purchase Date</label>
                            <input type="text" id="password" className="input-field" placeholder="Enter Location" required />
                        </div>
                        <div class="mb-6">
                            <label className="label-asset">DVR/CCTV Location</label>
                            <input type="text" id="confirm_password" className="input-field" placeholder="Enter Floor" required />
                        </div>

                        <div class="mb-6">
                            <label for="email" className="label-asset">IP Address</label>
                            <input type="email" id="email" className="input-field" placeholder="Enter email" required />
                        </div>
                        <div class="mb-6">
                            <label  className="label-asset">Created By</label>
                            <input type="text" id="password" className="input-field" placeholder="Enter Location" required />
                        </div>
                        <div class="mb-6">
                            <label className="label-asset">Deleted Status</label>
                            <input type="text" id="confirm_password" className="input-field" placeholder="Enter Floor" required />
                        </div> */}

                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={() => setIsAddPopupOpen(false)}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                onClick={handleAddAsset}
                            >
                                Submit
                            </button>
                        </div>

                    </form>
                </div>

            </div >
        </div >
    );
};

export default AssetAdd;
