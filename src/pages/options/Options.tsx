import "@pages/options/Options.css";

import React, { useEffect, useState } from "react";
import "@pages/popup/Popup.css";
import { Button, Modal, Table } from "antd";
import axios from 'axios'

const Options: React.FC = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setWebStorate()
    setIsLoading(true)
    axios.get('https://sandbox-inl.hasura.app/api/rest/get_bank_name')
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.data_connect_master_bank_name);
          setData(res.data.data_connect_master_bank_name)
        }
      })
      .finally(() => setIsLoading(false))
  }, [])

  const setWebStorate = () => {
    localStorage.setItem("testLocalStorage", "true")
    sessionStorage.setItem("testSessionStorage", "true");
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Abreviation',
      dataIndex: 'abreviation_name',
      key: 'abreviation_name',
    },
    {
      title: 'Vendor Id',
      dataIndex: 'vendor_bank_id',
      key: 'vendor_bank_id',
    },
  ];


  return (
    <div>
      <h1>Table</h1>
      <hr />
      <Table loading={isLoading} dataSource={data} columns={columns} />

      <h1>Web Storage</h1>
      <hr />
      <Button type="primary" onClick={() => localStorage.removeItem("testLocalStorage")}>Remove Local Storage</Button> <br />
      <Button type="primary" onClick={() => sessionStorage.removeItem("testSessionStorage")}>Remove Session Storage</Button>


      <h2>Modal</h2>
      <hr />
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Open Modal
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>

      <h2>I-Frame</h2>
      <hr />
      <iframe width="600" height="450" src="https://datastudio.google.com/embed/reporting/2d2c7885-b743-4c7f-adf5-a1e0f06a8793/page/gXr1C"></iframe>
    </div >
  );
};

export default Options;
