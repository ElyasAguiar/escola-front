import { useState, useEffect, useCallback } from 'react';
import { GlobalStyle, STitle, SForm, SInput, SError } from './StyledComponents';
import Debug from './Debug';
import Spinner from 'react-bootstrap/Spinner';
import { Icon } from '@iconify/react';
import { RouteComponentProps, Link, useNavigate } from '@reach/router';
import Message from './Message';
const axios = require('axios').default;

type Professor = {
  id_professor: string;
  id_titulo: string;
  tx_nome: string;
  tx_sexo: string;
  tx_estado_civil: string;
  dt_nascimento: string;
  tx_telefone: string;
};
type GetResponse = { data: { data: Professor } };
type UpdateResponse = { data: { updated: boolean } };
type InsertResponse = { data: { inserted: boolean } };

interface TProps extends RouteComponentProps {
  action?: string;
  id?: string | undefined;
}

export default function ProfessorEdit(props: TProps) {
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
    'https://escola-api.caprover.programadornoob.io/start_point/professor/';
  const { id, action } = props;
  const [txNome, setTxNome] = useState('');
  const [txTitulo, setTxTitulo] = useState('');
  const [txSexo, setTxSexo] = useState('');
  const [txEstadoCivil, setTxEstadoCivil] = useState('');
  const [dtDataNascimento, setDtDataNascimento] = useState('');
  const [txTelefone, setTxTelefone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(action === 'new' ? false : true);

  useEffect(() => {
    async function getTitulo() {
      await axios
        .get(url + id)
        .then((res: GetResponse) => {
          setTxNome(res.data.data.tx_nome);
          setTxTitulo(res.data.data.id_titulo);
          setTxSexo(res.data.data.tx_sexo);
          setTxEstadoCivil(res.data.data.tx_estado_civil);
          setDtDataNascimento(res.data.data.dt_nascimento);
          setTxTelefone(res.data.data.tx_telefone);
          setLoading(false);
        })
        .catch((error: any) => {
          return <h1>ERRO!!!! {error.message} </h1>;
        });
    }

    if (action === 'edit') getTitulo();
  });

  async function handleClick() {
    type TProfessor = {
      id_professor: string | undefined;
      id_titulo: string;
      tx_nome: string;
      tx_sexo: string;
      tx_estado_civil: string;
      dt_nascimento: string;
      tx_telefone: string;
    };

    let professor: TProfessor = {
      // Para edição ainda precisa acrescentar o id
      id_professor: undefined,
      id_titulo: txTitulo,
      tx_nome: txNome,
      tx_sexo: txSexo,
      tx_estado_civil: txEstadoCivil,
      dt_nascimento: dtDataNascimento,
      tx_telefone: txTelefone,
    };

    if (action === 'new') {
      await axios
        .post(
          'https://escola-api.caprover.programadornoob.io/start_point/professor',
          professor
        )
        .then((res: InsertResponse) => {
          setError('');
          if (res.data.inserted) alert('Professor inserido!');
          else alert('Professor não inserido!');
        })
        .catch((error: any) => {
          setError(Message(error.request.response));
        });
    } else {
      // action == 'edit'

      professor.id_professor = id;

      await axios
        .put(
          url + professor.id_professor?.concat('/'),
          {
            id_titulo: professor.id_titulo,
            tx_nome: professor.tx_nome,
            tx_sexo: professor.tx_sexo,
            tx_estado_civil: professor.tx_estado_civil,
            dt_nascimento: professor.dt_nascimento,
            tx_telefone: professor.tx_telefone,
          },
          {
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }
        )
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
            to={'/professor/'}
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
            {action === 'new' ? 'Inserindo' : 'Alterando'} Professor{' '}
          </STitle>
          <SError>
            <p> {error} </p>
          </SError>

          <label htmlFor='desc'>Nome</label>
          <SInput
            type='text'
            name='desc'
            autoFocus={true}
            value={txNome}
            onChange={(e) => setTxNome(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleClick();
              }
            }}
          />

          <label htmlFor='desc'>Código do Título</label>
          <SInput
            type='text'
            name='desc'
            autoFocus={true}
            value={txTitulo}
            onChange={(e) => setTxTitulo(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleClick();
              }
            }}
          />

          <label htmlFor='desc'>Sexo</label>
          <SInput
            type='text'
            name='desc'
            autoFocus={true}
            value={txSexo}
            onChange={(e) => setTxSexo(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleClick();
              }
            }}
          />

          <label htmlFor='desc'>Estado Civil</label>
          <SInput
            type='text'
            name='desc'
            autoFocus={true}
            value={txEstadoCivil}
            onChange={(e) => setTxEstadoCivil(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleClick();
              }
            }}
          />

          <label htmlFor='desc'>Data de Nascimento</label>
          <SInput
            type='text'
            name='desc'
            autoFocus={true}
            value={dtDataNascimento}
            onChange={(e) => setDtDataNascimento(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleClick();
              }
            }}
          />
          <label htmlFor='desc'>Telefone</label>
          <SInput
            type='phone'
            name='desc'
            autoFocus={true}
            value={txTelefone}
            onChange={(e) => setTxTelefone(e.target.value)}
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

          <Debug active={false} content={{ txNome, error }} />
        </SForm>
      </>
    );
}
