import React, { useEffect, useState } from "react";
import "./style.css";
import { ConfigProvider, Table } from "antd";
import { useSelector } from "react-redux";
import { getWarehouseById } from "../../redux/apiRequest";

const report_columns = [
  {
    title: "Code",

    dataIndex: "code",
    width: 150,
    key: "code",
    render: (text) => <p style={{ color: "#1677ff" }}>{text}</p>,
  },
  {
    title: "Total Actual Quantity",
    dataIndex: "totalActualQuantity",
    key: "totalActualQuantity",
    width: 200,
  },
  {
    title: "Total Difference Quantity",
    dataIndex: "totalDiffQuantity",
    key: "totalDiffQuantity",
    width: 200,
  },
  {
    title: "Increase Quantity",
    dataIndex: "increaseQuantity",
    key: "increaseQuantity",
    width: 200,
  },
  {
    title: "Decrease Quantity",
    dataIndex: "decreaseQuantity",
    key: "decreaseQuantity",
    width: 200,
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 200,
  },
  {
    title: "Updated At",
    dataIndex: "updatedAt",
    key: "updatedAt",
    width: 200,
  },
];

const InventoryReportBill = React.forwardRef(({ formData }, ref) => {
  const [warehouse, setWarehouse] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  console.log("formData?bill", formData);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userWarehouseId = user.employeeId.warehouseId;

  const goodsList = useSelector(
    (state) => state.product.goodsList?.allProductsIncludeDelete
  );

  const partners = useSelector(
    (state) => state.partner.supplier?.allPartnersIncludeDelete
  );
  console.log("userwh", userWarehouseId);

  let supplier;
  let supplierContactId;

  console.log("suppliers", partners);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const res = await getWarehouseById(userWarehouseId);
        console.log("res", res);
        setWarehouse(res.data);
      } catch (e) {
        console.log(e);
      }

      setIsFetching(false);
    }
    fetchData();
  }, [userWarehouseId]);

  if (partners && formData && warehouse) {
    supplier = partners?.find((sup) => sup._id === formData.supplierId);
    supplierContactId = supplier.contactId;
  }
  console.log("warehouse", warehouse);
  if (isFetching) {
    return null;
  }

  return (
    <div ref={ref}>
      <div style={{ margin: "16px" }}>
        <div>
          <span style={{ fontSize: "28px" }} className="fs-32 bold">
            INVENTORY REPORT
          </span>
          <span className=" italic fs-14">{formData?.status}</span>
        </div>
        <div className="Info">
          <div className="TransactionInfo">
            <span className="fs-16 bold">Time of inventory: </span>
            {/* Thời gian thực hiện kiểm kê - chỗ này để ghi?*/}
            <br />
            <span className="fs-16 bold">Created at: </span>
            <span className="fs-14 italic">{formData?.create_time}</span>
            {/* Thời gian người tạo kiểm kê lên hệ thống? */}
            <br></br>
            <span className="fs-16 bold italic">
              Prepared by: {formData?.creatorName}
            </span>
            {/* Người tạo kiểm kê lên hệ thống? */}
          </div>
          <div className="WarehouseInfo">
            <span className="fs-20 bold">
              Warehouse: {warehouse ? warehouse.name : ""}
            </span>
            <br></br>
            <span className="fs-12 italic">
              {warehouse ? warehouse.id : ""}
            </span>
            <br></br>
            <span className="fs-12 italic">
              {warehouse ? warehouse.contactId.address : ""}
            </span>
            <br></br>
            <span className="fs-12 italic">
              {warehouse
                ? warehouse.contactId.phone_num +
                  " - " +
                  warehouse.contactId.email
                : ""}
            </span>
          </div>
          <div className="EmployeeInfo">
            <span className="fs-20 bold">
              Inventory Employee:
              {/* Nhân viên kiểm kê*/}
            </span>
            <br></br>
            <span className="fs-12 italic">
              {/*employee id - Mã nhân viên */}
            </span>
            <br></br>
            <span className="fs-12 italic">
              {/* employee phone_num + email - Thông tin liên lạc của nhân viên */}
            </span>
          </div>
        </div>

        <div style={{ textAlign: "center" }} className="TransactionDetail">
          <div>
            <ConfigProvider
              theme={{
                components: {
                  Table: {
                    borderColor: "black",
                  },
                },
              }}
            >
              <Table
                bordered
                style={{
                  marginTop: "10px",
                  textAlign: "center",
                }}
                columns={report_columns}
                dataSource={formData?.trans_details.map((detail, i) => {
                  const product = goodsList.find(
                    (goods) => goods._id === detail.productId
                  );
                  return {
                    id: i + 1,
                    name: product.name,
                    quantity: detail.quantity,
                    price: Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(detail.total),
                  };
                })}
                pagination={false}
              />
            </ConfigProvider>
          </div>
        </div>
        <div className="ConfirmationInformation">
          <div className="Signature">
            <div className="flex-grow ASign">
              <span className="fs-16 bold">General Director</span>
              <span className="fs-14">
                {"(Opinions to  resolve the difference)"}
              </span>
              <span className="fs-14 italic">{"(Sign, full name)"}</span>
            </div>
            <div className="flex-grow ASign">
              <span className="fs-16 bold">
                Head of the inventory department
              </span>
              <span className="fs-14 italic">{"(Sign, full name)"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default InventoryReportBill;
