import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Flex,
  Heading,
  Select,
  TextArea,
  TextField,
} from '@radix-ui/themes';
import { Page, PageMutation } from '../../types';
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
  const [pages, setPages] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchPages = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await axiosApi.get('/pages.json');
      const pageNames = Object.keys(data);
      setPages(pageNames);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchPageData = useCallback(async () => {
    try {
      setIsLoading(true);
      const { page } = pageMutation;
      const { data } = await axiosApi.get<Page>(`/pages/${page}.json`);
      if (data)
        setPageMutation({
          ...data,
          page: page,
        });
    } finally {
      setIsLoading(false);
    }
  }, [pageMutation.page]);

  useEffect(() => {
    void fetchPages();
    void fetchPageData();
  }, [fetchPages, fetchPageData]);

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
          disabled={isLoading}
        >
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              <Select.Label>Pages</Select.Label>
              {pages &&
                pages.map((page) => (
                  <Select.Item key={page} value={page}>
                    {page.charAt(0).toUpperCase() + page.slice(1)}
                  </Select.Item>
                ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>

        <TextField.Root
          placeholder='Title…'
          name={'title'}
          value={pageMutation.title}
          onChange={onFieldChange}
          disabled={isLoading}
        />
        <TextArea
          placeholder='Content…'
          rows={5}
          name={'content'}
          value={pageMutation.content}
          onChange={onFieldChange}
          disabled={isLoading}
        />

        <Button variant={'surface'} onSubmit={onFormSubmit}>
          Save
        </Button>
      </Flex>
    </form>
  );
};
