const constraints = 
{
    'uk__titulo__tx_descricao': 'Título em uso!'
}

const Message = (error:String) => {
    let constraint: keyof typeof constraints
    for ( constraint in constraints )
      if ( error.indexOf(constraint) !== -1 )
        return constraints[constraint]
    
    return `Erro não mapeado: ${error}!`
}

export default Message;