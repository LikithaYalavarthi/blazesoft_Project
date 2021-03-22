import { useState } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Modal, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { addbook, editbook } from './features/bookStore';

function App() {
  const bookValues = useSelector((state) => state.bookStore.bookvalues);
  const dispatch = useDispatch();

  const [theid, setid] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [thename, setthename] = useState('');
  const [editname, seteditname] = useState('');
  const [theprice, settheprice] = useState('');
  const [editprice, seteditprice] = useState('');
  const [thecategory, setthecategory] = useState('');
  const [editcategory, seteditcategory] = useState('');
  const [thedescription, setthedescription] = useState('');
  const [editdescription, seteditdescription] = useState('');
  const [editid, seteditid] = useState(false);

  const showModal = (e) => {
    setIsModalVisible(true);
    console.log(e.target.name);
    setid(e.target.name);
    // const newBookValues = [...bookValues]
    // newBookValues.splice(newBookValues.findIndex(a => a.id === e.target.name), 1)
    // console.log(newBookValues)
  };

  const editModal = (e) => {
    console.log(bookValues);
    setIsEditVisible(true);
    console.log(e.currentTarget.textContent[0]);
    seteditid(e.currentTarget.textContent[0]);
    bookValues.forEach((element) => {
      if (element.id === e.currentTarget.textContent[0]) {
        console.log(element.name);
        seteditname(element.name);
        seteditprice(element.price);
        seteditcategory(element.category);
        seteditdescription(element.description);
      }
    });
  };

  const handleOk = () => {
    setIsModalVisible(false);
    const newBookValues = [...bookValues];
    newBookValues.splice(
      newBookValues.findIndex((a) => a.id === theid),
      1
    );
    newBookValues.sort(function (a, b) {
      return a.id - b.id;
    });
    dispatch(editbook(newBookValues));
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const AddModal = (e) => {
    setIsAddVisible(true);
  };

  const handleAddOk = () => {
    if (thename === '') {
      message.error('Please enter book name');
    } else if (theprice === '') {
      message.error('Please enter price');
    } else if (thecategory === '') {
      message.error('Please enter category');
    } else {
      var bookvalue = {
        id: (bookValues.length + 1).toString(),
        name: thename,
        price: theprice,
        category: thecategory,
        description: thedescription,
      };
      setIsAddVisible(false);
      dispatch(addbook(bookvalue));
      setthename('');
      settheprice('');
      setthecategory('');
      setthedescription('');
    }
    console.log(bookvalue);
  };
  const handleAddCancel = () => {
    setIsAddVisible(false);
  };
  const handleEditOk = (e) => {
    let body = {
      id: editid,
      name: editname,
      price: editprice,
      category: editcategory,
      description: editdescription,
    };
    console.log(body);
    const newEditValues = [...bookValues];
    newEditValues.splice(
      newEditValues.findIndex((a) => a.id === editid),
      1
    );
    let newEditValuesSort = [...newEditValues, body];
    newEditValuesSort.sort(function (a, b) {
      return a.id - b.id;
    });
    dispatch(editbook(newEditValuesSort));
    setIsEditVisible(false);
  };
  const handleEditCancel = (e) => {
    setIsEditVisible(false);
  };

  return (
    <div className='App'>
      <div className='container'>
        <h1 className='thebasic'>Frontend Developer test</h1>
        <div className='addbtn-sty'>
          <input
            type='button'
            className='addbtn'
            value='Add Book'
            onClick={AddModal}
          />
          <Modal
            title='Add Book'
            visible={isAddVisible}
            onOk={handleAddOk}
            onCancel={handleAddCancel}
          >
            <input
              type='name'
              value={thename}
              placeholder='Enter Book Name'
              className='blog-sty'
              onChange={(e) => setthename(e.target.value)}
              style={{ width: '100%' }}
            />
            <input
              type='price'
              value={theprice}
              placeholder='Enter Book Price'
              className='blog-sty'
              onChange={(e) => settheprice(e.target.value)}
              style={{ width: '100%' }}
            />
            <input
              type='price'
              value={thecategory}
              placeholder='Enter Category'
              className='blog-sty'
              onChange={(e) => setthecategory(e.target.value)}
              style={{ width: '100%' }}
            />
          </Modal>

          <Modal
            title='Edit Book Details'
            visible={isEditVisible}
            onOk={handleEditOk}
            onCancel={handleEditCancel}
          >
            <input
              type='name'
              value={editname}
              placeholder='Enter Book Name'
              className='blog-sty'
              onChange={(e) => seteditname(e.target.value)}
              style={{ width: '100%' }}
            />
            <input
              type='price'
              value={editprice}
              placeholder='Enter Book Price'
              className='blog-sty'
              onChange={(e) => seteditprice(e.target.value)}
              style={{ width: '100%' }}
            />
            <input
              type='price'
              value={editcategory}
              placeholder='Enter Category'
              className='blog-sty'
              onChange={(e) => seteditcategory(e.target.value)}
              style={{ width: '100%' }}
            />
          </Modal>
        </div>
        <div className='row'>
          {bookValues.map((element) => {
            return (
              <>
                <div className='col-sm-4'>
                  <div className='card thebtm' onClick={editModal}>
                    <p style={{ display: 'none' }}>{element.id}</p>
                    <p className='title-sty'>
                      Title&nbsp;:&nbsp;{element.name}
                    </p>
                    <p className='title-sty'>
                      Price&nbsp;:&nbsp;{element.price}
                    </p>
                    <p className='title-sty'>
                      Category&nbsp;:&nbsp;{element.category}
                    </p>
                    {/* <input type="button" className="editbtn-sty" value="Edit" name={element.id} onClick={editModal} /> */}
                  </div>
                  <Modal
                    title='Confirm Delete'
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                  >
                    <p>Do you want to delete this book ?</p>
                  </Modal>
                  <input
                    type='button'
                    className='btn-sty'
                    value='Delete'
                    name={element.id}
                    onClick={showModal}
                  />
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
