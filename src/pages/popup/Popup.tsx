// import App from '../content/components/Demo/app'

import React, { useEffect, useState } from "react";
import "@pages/popup/Popup.css";
import { Button, Modal, Table } from "antd";
import axios from 'axios'

const Popup = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [temp, setTemp] = useState<any>([]);


  // useEffect(() => {
  //   // Once the DOM is ready... 
  //   window.addEventListener('DOMContentLoaded', sendData);
  //   return () => {
  //     window.removeEventListener('DOMContentLoaded', sendData);
  //   };
  // }, [])

  // const sendData = () => {
  //   chrome.tabs.query({
  //     active: true,
  //     currentWindow: true
  //   }, tabs => {
  //     // ...and send a request for the DOM info...
  //     chrome.tabs.sendMessage(
  //       tabs[0].id,
  //       { from: 'popup', subject: 'DOMInfo' },
  //       // ...also specifying a callback to be called 
  //       //    from the receiving end (content script).
  //       (e) => {
  //         console.log({ e });
  //         setTemp(e)
  //       });
  //   });
  // }

  useEffect(() => {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, tabs => {
      // ...and send a request for the DOM info...
      chrome.tabs.sendMessage(
        tabs[0].id,
        { from: 'popup', subject: 'DOMInfo' },
        // ...also specifying a callback to be called 
        //    from the receiving end (content script).
        (e) => {
          console.log({ e });
          setTemp(e)
        });
    });
  }, [chrome.tabs])

  // useEffect(() => {
  // chrome.storage.sync.get(['title'], (obj) => {
  //   setTemp(obj.title)
  //   console.log({ v: obj.title })
  // });

  // }, [])


  useEffect(() => {
    setWebStorate()
    setIsLoading(true)
    axios.get('https://sandbox-inl.hasura.app/api/rest/get_bank_name')
      .then((res) => {
        if (res.status === 200) {
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

  const columnsElemnt = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'User Code',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  return (
    <div>

      <h1>Get Element</h1>
      <hr />

      {
        temp.length === 0 ? null : <Table dataSource={temp} columns={columnsElemnt} />
      }


      <h1>Table</h1>
      <hr />
      <Table loading={isLoading} dataSource={data} columns={columns} />


      <h1>Option</h1>
      <hr />
      <Button type="primary" onClick={() => chrome.runtime.openOptionsPage()}>Show Option</Button> <br />

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

export default Popup;
