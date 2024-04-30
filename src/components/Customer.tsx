import { FiTrash } from 'react-icons/fi';

interface CustomerProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: boolean;
}

export default function Customer({ customer, handleDelete }: { customer: CustomerProps, handleDelete: (id: string) => void }) {
    return(
        <article 
        key={ customer.id }
        className="w-full bg-white rounded p-2 relative hover:scale-105 duration-200 shadow-md">
            <p> <span className="font-medium"> Nome: </span> { customer.name } </p>
            <p> <span className="font-medium"> Email: </span> { customer.email } </p>
            <p> <span className="font-medium"> Telefone: </span> { customer.phone } </p>
            <p> <span className="font-medium"> CEP: </span> { customer.address } </p>
            <p> <span className="font-medium"> Status: </span> { customer.status ? 'ATIVO' : 'INATIVO' } </p>
            <button className='bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute -top-2 right-0' onClick={() => handleDelete(customer.id)}>
                <FiTrash size={18} color='#FFF'/>
            </button>
        </article>
    );
}