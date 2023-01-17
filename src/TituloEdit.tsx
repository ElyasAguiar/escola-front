import { useState, useEffect, useCallback } from 'react';
import { GlobalStyle, STitle, SForm, SInput, SError } from './StyledComponents';
import Debug from './Debug';
import Spinner from 'react-bootstrap/Spinner';
import { Icon } from '@iconify/react';
import { RouteComponentProps, Link, useNavigate } from '@reach/router';
import Message from './Message';
const axios = require('axios').default;

type Titulo = { id_titulo: number; tx_descricao: string };
type GetResponse = { data: { data: Titulo } };
type UpdateResponse = { data: { updated: boolean } };
type InsertResponse = { data: { inserted: boolean } };

interface TProps extends RouteComponentProps {
  action?: string;
  id?: string | undefined;
}

export default function TituloEdit(props: TProps) {
  // TRATANDO RETORNO COM ESC -- INÍCIO
  const navigate = useNavigate();

  const escFunction = useCallback(
    (event) => {
      if (event.keyCode === 27)
        // ESC Code
        navigate('/');
    },
    [navigate]
  );

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);
  // TRATANDO RETORNO COM ESC -- TÉRMINO

  const url =
    'https://escola-api.caprover.programadornoob.io/start_point/titulo/';
  const { id, action } = props;
  const [txDescricao, setTxDescricao] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(action === 'new' ? false : true);

  useEffect(() => {
    async function getTitulo() {
      await axios
        .get(url + id)
        .then((res: GetResponse) => {
          setTxDescricao(res.data.data.tx_descricao);
          setLoading(false);
        })
        .catch((error: any) => {
          return <h1>ERRO!!!! {error.message} </h1>;
        });
    }

    if (action === 'edit') getTitulo();
  }, [action, id]);

  async function handleClick() {
    type TTitulo = {
      id_titulo?: string | undefined;
      tx_descricao: string;
    };

    let titulo: TTitulo = {
      // Para edição ainda precisa acrescentar o id
      id_titulo: undefined,
      tx_descricao: txDescricao,
    };

    if (action === 'new') {
      await axios
        .post(
          'https://escola-api.caprover.programadornoob.io/start_point/titulo',
          { tx_descricao: titulo.tx_descricao }
        )
        .then((res: InsertResponse) => {
          setError('');
          if (res.data.inserted) alert('Título inserido!');
          else alert('Título não inserido!');
        })
        .catch((error: any) => {
          setError(Message(error.request.response));
        });
    } else {
      // action == 'edit'

      titulo.id_titulo = id;

      await axios
        .put(url + titulo.id_titulo?.concat('/'), {
          tx_descricao: titulo.tx_descricao,
        })
        .then((res: UpdateResponse) => {
          setError('');
          if (res.data.updated) alert('Título Alterado!');
          else alert('Título não Alterado!');
        })
        .catch((error: any) => {
          console.log(error.request);
          setError(Message(error.request.response));
        });
    }
  }

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
        <SForm>
          <Link
            to={'/'}
            title='FECHAR (ESC)'
            style={{
              display: 'flex',
              justifyContent: 'right',
              alignItems: 'right',
            }}
          >
            <Icon
              icon='ant-design:close-square-filled'
              color='red'
              width='50'
              height='50'
            />
          </Link>

          <STitle>
            {' '}
            {action === 'new' ? 'Inserindo' : 'Alterando'} Título{' '}
          </STitle>
          <SError>
            <p> {error} </p>
          </SError>

          <label htmlFor='desc'>Descrição</label>
          <SInput
            type='text'
            name='desc'
            autoFocus={true}
            value={txDescricao}
            onChange={(e) => setTxDescricao(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleClick();
              }
            }}
          />

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            title='SALVAR'
          >
            <Icon
              icon='flat-ui:save'
              color='green'
              width='50'
              height='50'
              type='submit'
              onClick={() => {
                handleClick();
              }}
            />
          </div>

          <Debug active={false} content={{ txDescricao, error }} />
        </SForm>
      </>
    );
}
