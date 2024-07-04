import React, { useState } from 'react';
import {
  Button,
  Flex,
  Heading,
  Select,
  TextArea,
  TextField,
} from '@radix-ui/themes';
import { PageMutation } from '../../types';
import axiosApi from '../../axiosApi';
import { useNavigate } from 'react-router-dom';

const initialState: PageMutation = {
  title: '',
  content: '',
  page: 'about',
};

export const PageForm = () => {
  const navigate = useNavigate();
  const [pageMutation, setPageMutation] = useState(initialState);

  const onFieldChange = (
    event: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setPageMutation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onCategoryChange = (value: string) => {
    setPageMutation((prevState) => ({
      ...prevState,
      page: value,
    }));
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      const baseUrl = `/pages/${pageMutation.page}.json`;
      const homeUrl = '/pages/home.json';

      await axiosApi.put(pageMutation.page === '/' ? homeUrl : baseUrl, {
        title: pageMutation.title,
        content: pageMutation.content,
      });
    } finally {
      navigate(
        pageMutation.page === 'home' ? '/' : `/pages/${pageMutation.page}`
      );
      setPageMutation(initialState);
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <Flex direction={'column'} gap={'3'}>
        <Heading weight={'medium'}>Edit page</Heading>

        <Select.Root
          name={'page'}
          required
          value={pageMutation.page}
          onValueChange={onCategoryChange}
        >
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              <Select.Label>Pages</Select.Label>
              <Select.Item value='about'>About</Select.Item>
              <Select.Item value='contacts'>Contacts</Select.Item>
              <Select.Item value='home'>Home</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>

        <TextField.Root
          placeholder='Title…'
          name={'title'}
          value={pageMutation.title}
          onChange={onFieldChange}
        />
        <TextArea
          placeholder='Content…'
          rows={5}
          name={'content'}
          value={pageMutation.content}
          onChange={onFieldChange}
        />

        <Button variant={'surface'} onSubmit={onFormSubmit}>
          Save
        </Button>
      </Flex>
    </form>
  );
};
