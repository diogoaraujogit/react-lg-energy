import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/Layout'

import { Container } from './styles';

const Group = () => {

  const { id } = useParams()

  return (
    <Layout title='Group'>
      <Container>
        {`Group ${id}`}
      </Container>
    </Layout>

  );
}

export default Group;