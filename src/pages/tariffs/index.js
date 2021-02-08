import React from 'react';
import { MdEdit } from 'react-icons/md';
import Layout from '../../components/Layout'

import { Container, Content, Header, Body, Previous } from './styles';

const Tariffs = () => {

  const tariffs = [
    {
      value: '$ 1,07',
      peak: '$ 1,57',
      date: '$ 20/12/2020',
    },
    {
      value: '$ 1,07',
      peak: '$ 1,57',
      date: '$ 20/12/2020',
    },
    {
      value: '$ 1,07',
      peak: '$ 1,57',
      date: '$ 20/12/2020',
    },
    {
      value: '$ 1,07',
      peak: '$ 1,57',
      date: '$ 20/12/2020',
    },
  ]

  return (
    <Layout title='Tariffs'>
      <Container>
        <Content>
          <Header>
            <div className='peak'>
              <p>Peak Hour</p>
              <div>
                <p>Starter hour</p>
                <div>
                  00:00
                </div>
              </div>
              <div>
                <p>Final hour</p>
                <div>
                  00:00
                </div>
              </div>
            </div>
            <div className='edit'>
              <button>
                <MdEdit /> Edit
              </button>
            </div>
          </Header>
          <Body>
            <div>
              <h4>Average Tariff</h4>
              <div>
                $ 1,07
              </div>
            </div>
            <div>
              <h4>Average Peak Tariff</h4>
              <div>
                $ 1,57
              </div>
            </div>
            <div>
              <h4>Reference Date</h4>
              <div>
                20/12/2020
              </div>
            </div>
          </Body>
          <Previous>
            <h3>PREVIOUS TARIFFS</h3>
            <div>
              {
                tariffs.map(tariff => {

                  return(
                    <div>
                      <div>
                        <p>Tariff Value</p>
                        <span>{tariff.value}</span>
                      </div>
                      <div>
                        <p>Peak Tariff</p>
                        <span>{tariff.peak}</span>
                      </div>
                      <div>
                        <p>Reference Date</p>
                        <span>{tariff.date}</span>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </Previous>
        </Content>
      </Container>
    </Layout>

  );
}

export default Tariffs;