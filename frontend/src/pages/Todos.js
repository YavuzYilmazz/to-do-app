import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, message, Popconfirm, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import API from '../services/api';
import '../styles/Todos.css';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingTodo, setEditingTodo] = useState(null);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await API.get('/todos');
      setTodos(response.data.todos);
    } catch (error) {
      message.error('Failed to load todos');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description || '');

    if (values.thumbnail && values.thumbnail.file) {
      formData.append('thumbnail', values.thumbnail.file.originFileObj);
    }

    if (values.attachments && values.attachments.fileList) {
      values.attachments.fileList.forEach((file) => {
        formData.append('attachments', file.originFileObj);
      });
    }

    try {
      if (editingTodo) {
        await API.put(`/todos/${editingTodo._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        message.success('To-Do updated successfully');
      } else {
        await API.post('/todos', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        message.success('To-Do added successfully');
      }
      form.resetFields();
      setIsModalOpen(false);
      setEditingTodo(null);
      fetchTodos();
    } catch (error) {
      message.error('Failed to save To-Do');
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/todos/${id}`);
      message.success('To-Do deleted successfully');
      fetchTodos();
    } catch (error) {
      message.error('Failed to delete To-Do');
    }
  };

  const openModal = (todo = null) => {
    setIsModalOpen(true);
    setEditingTodo(todo);
    if (todo) {
      form.setFieldsValue({
        title: todo.title,
        description: todo.description,
      });
    } else {
      form.resetFields();
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (text) =>
        text ? (
          <img
            src={`http://localhost:5001/uploads/${text}`}
            alt="Thumbnail"
            className="todo-thumbnail"
          />
        ) : (
          'No Thumbnail'
        ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div>
          <Button type="link" onClick={() => openModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this To-Do?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="todo-container">
      <Button
        type="primary"
        onClick={() => openModal()}
        className="todo-add-button"
      >
        Add To-Do
      </Button>
      <Table
        columns={columns}
        dataSource={todos}
        rowKey={(record) => record._id}
        loading={loading}
      />
      <Modal
        title={editingTodo ? 'Edit To-Do' : 'Add To-Do'}
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        className="todo-modal"
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter the title' }]}
          >
            <Input placeholder="Enter title" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={4} placeholder="Enter description" />
          </Form.Item>
          <Form.Item name="thumbnail" label="Thumbnail">
            <Upload
              maxCount={1}
              beforeUpload={() => false}
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Upload Thumbnail</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="attachments" label="Attachments">
            <Upload
              multiple
              beforeUpload={() => false}
              listType="text"
            >
              <Button icon={<UploadOutlined />}>Upload Attachments</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {editingTodo ? 'Update' : 'Add'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Todos;
