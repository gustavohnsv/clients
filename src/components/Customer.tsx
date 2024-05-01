import { FiTrash, FiEdit3, FiActivity } from 'react-icons/fi';
import { format } from 'date-fns'; // Function format(Date, 'mascara') -> Ex: format(new Date(), 'dd/MM/yyyy HH:mm')

interface CustomerProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: boolean;
  create_at: Date;
  update_at: Date;
}

export default function Customer({ customer, handleDelete, handleEdit, changeStatus }: { customer: CustomerProps, handleDelete: (id: string) => void , handleEdit: (id: string) => void, changeStatus: (id: string) => void}) {

    const borderColor = customer.status ? 'border-lime-500' : 'border-gray-500';

    return (
        <article 
        key={customer.id}
        className={`w-full bg-white rounded p-2 relative hover:scale-105 duration-200 shadow-md border-l-8 ${borderColor}`}
        >
            <p> <span className="font-medium"> Nome: </span> {customer.name} </p>
            <p> <span className="font-medium"> Email: </span> {customer.email} </p>
            <p> <span className="font-medium"> Telefone: </span> {customer.phone} </p>
            <p> <span className="font-medium"> CEP: </span> {customer.address} </p>
            <p> <span className="font-medium"> Criado em: </span> {format(customer.create_at, "dd/MM/yyyy HH:mm")} </p>
            <p> <span className="font-medium"> Última mudança: </span> {format(customer.update_at, "dd/MM/yyyy HH:mm")} </p>
            <p> <span className="font-medium"> Status: </span> {customer.status ? 'ATIVO' : 'INATIVO'} </p>
            <button 
            className='bg-red-500 w-6 h-6 flex items-center justify-center rounded-2xl absolute top-2 right-4 shadow-md' 
            onClick={() => handleDelete(customer.id)} 
            title='Remover'
            >
                <FiTrash size={16} color='#FFF' />
            </button>
            <button 
            className='bg-yellow-500 w-6 h-6 flex items-center justify-center rounded-2xl absolute top-2 right-14 shadow-md' 
            onClick={() => handleEdit(customer.id)}
            title='Editar'
            >
                <FiEdit3 size={16} color='#FFF' />
            </button>
            <button 
            className='bg-purple-500 w-6 h-6 flex items-center justify-center rounded-2xl absolute top-2 right-24 shadow-md' 
            onClick={() => changeStatus(customer.id)}
            title='Mudar status'
            >
                <FiActivity size={16} color='#FFF' />
            </button>
        </article>
    );
}