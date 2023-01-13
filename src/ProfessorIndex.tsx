import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { GlobalStyle, STitle, SForm } from './StyledComponents';
import { Icon } from '@iconify/react';
import Message from './Message';
import { RouteComponentProps, Link } from '@reach/router';
const axios = require('axios').default;

type Professor = {
  id_professor: Number;
  id_titulo: Number;
  tx_nome: String;
  tx_sexo: String;
  tx_estado_civil: String;
  dt_nascimento: String;
  tx_telefone: String;
};
type GetProfessorResponse = { data: { data: Professor[] } };

interface TProps extends RouteComponentProps {
  url?: string;
}

export default function ProfessorIndex(props: TProps) {
  const [url] = useState(props.url);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);

  const paginationFactoryOptions = {
    // page, // Specify the current page. It's necessary when remote is enabled
    // sizePerPage, // Specify the size per page. It's necessary when remote is enabled
    // totalSize, // Total data size. It's necessary when remote is enabled
    pageStartIndex: 0, // first page will be 0, default is 1
    paginationSize: 3, // the pagination bar size, default is 5
    showTotal: false, // display pagination information
    sizePerPageList: [
      {
        text: '5',
        value: 5,
      },
      {
        text: '10',
        value: 10,
      },
      // {
      //   text: 'All', value: products.length
      // }
    ], // A numeric array is also available: [5, 10]. the purpose of above example is custom the text
    withFirstAndLast: true, // hide the going to first and last page button
    alwaysShowAllBtns: true, // always show the next and previous page button
    firstPageText: 'Primeiro', // the text of first page button
    prePageText: 'Anterior', // the text of previous page button
    nextPageText: 'Próximo', // the text of next page button
    lastPageText: 'Último', // the text of last page button
    nextPageTitle: 'Vá para o próximo', // the title of next page button
    prePageTitle: 'Vá para o anterior', // the title of previous page button
    firstPageTitle: 'Vá para o primeiro', // the title of first page button
    lastPageTitle: 'Vá para o último', // the title of last page button
    hideSizePerPage: false, // hide the size per page dropdown
    hidePageListOnlyOnePage: true, // hide pagination bar when only one page, default is false
    // onPageChange: (page, sizePerPage) => {}, // callback function when page was changing
    // onSizePerPageChange: (sizePerPage, page) => {}, // callback function when page size was changing
    // paginationTotalRenderer: (from, to, size) => { ... }  // custom the pagination total
  };

  async function deleteRow(id: string) {
    if (url)
      await axios
        .delete(url.concat('/').concat(id).concat('/'), {
          headers: {
            accept: 'application/json',
          },
        })
        .then((response: any) => {
          if (!response.data.removed) alert(Message(response.data.message));
          else alert('Registro Excluído!');
          setLoading(true);
        })
        .catch((error: any) => {
          alert(error.request.response);
        });
  }

  const columns = [
    {
      // headerStyle: { backgroundColor: '#215E95', color: 'white', borderRadius:'25px', border:'0px'},
      dataField: 'id_professor',
      text: 'Código',
      sort: true,
    },
    {
      // headerStyle: { backgroundColor: '#215E95', color: 'white', borderRadius:'25px', border:'0px'},
      dataField: 'tx_nome',
      text: 'Nome',
      sort: true,
    },
    {
      // headerStyle: { backgroundColor: '#215E95', color: 'white', borderRadius:'25px', border:'0px'},
      dataField: 'dt_nascimento',
      text: 'Data de Nascimento',
      sort: true,
    },
    {
      // headerStyle: { backgroundColor: '#215E95', color: 'white', borderRadius:'25px', border:'0px'},
      dataField: 'tx_telefone',
      text: 'Telefone',
      sort: true,
    },
    {
      dataField: 'df',
      isDummyField: true,
      text: 'Alterar',
      formatter: (cellContent: any, row: any) => (
        <Link to={'/editProfessor/edit/' + row.id_professor} title='ALTERAR'>
          <Icon
            icon='dashicons:edit-large'
            color='orange'
            width='25'
            height='25'
          />
        </Link>
      ),
    },
    {
      dataField: 'id_professor',
      isDummyField: true,
      text: 'Excluir',
      formatter: (cellContent: any, row: any) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          title='EXCLUIR'
        >
          <Icon
            icon='fluent:delete-20-filled'
            color='red'
            width='25'
            height='25'
            inline={true}
            onClick={() => {
              const excluir = window.confirm('Excluir?');
              if (excluir) {
                deleteRow(String(row.id_professor));
              }
            }}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    async function getLines() {
      // let lines: JSX.Element[] = [];

      await axios
        .get(props.url)
        .then((res: GetProfessorResponse) => {
          setData(res.data.data);
          setLoading(false);
        })
        .catch((error: any) => {
          return <h1>ERRO!!!! {error.message} </h1>;
        });
    }

    getLines();
  }, [loading, props.url]);

  if (loading)
    return (
      <div className='d-flex justify-content-center' style={{ color: 'blue' }}>
        <Spinner animation='border' variant='primary' />
        <b> ===== C A R R E G A N D O ===== </b>
        <Spinner animation='border' variant='primary' />
      </div>
    );
  else
    return (
      <>
        <GlobalStyle />
        <STitle color='purple'> CRUD PROFESSOR </STitle>
        <SForm>
          <STitle> Professores </STitle>
          <div style={{ width: '100%' }}>
            {' '}
            {/* Alinha */}
            <BootstrapTable
              striped
              bordered={true}
              hover
              keyField='id_professor'
              data={data}
              columns={columns}
              rowStyle={{
                fontSize: 13,
                textAlign: 'center',
                borderRadius: '25px',
              }}
              headerClasses='table table-dark text-center'
              classes='thead-light'
              pagination={paginationFactory(paginationFactoryOptions)}
            />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            title='NOVO'
          >
            <Link to={'/editProfessor/new'}>
              <Icon
                icon='fluent:add-circle-24-filled'
                width='50'
                height='50'
                color='green'
              />
            </Link>
          </div>
        </SForm>
      </>
    );
}
