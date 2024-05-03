import { useEffect, useState, useRef, FormEvent } from 'react';
import { api } from './services/api';
import Customer from './components/Customer';
import Swal from 'sweetalert2';
import DarkMode from './components/DarkMode';

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

export default function App() {

  const [customerID, setCustomerID] = useState<string>('');
  const [editMode, setEditMode] = useState<boolean>(false);
  const [customers, setCustomers] = useState<CustomerProps[]>([]);
  const nameRef = useRef<HTMLInputElement | null >(null);
  const emailRef = useRef<HTMLInputElement | null >(null);
  const phoneRef = useRef<HTMLInputElement | null >(null);
  const addressRef = useRef<HTMLInputElement | null >(null);

  function sucessMessage(title: string, desc: string) {
    Swal.fire({
      title: `${title}`,
      text: `${desc}`,
      icon: "success",
      timer: 1500,
      timerProgressBar: true
    });
  }

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    const response = await api.get('/customer');
    console.log(response.data);
    setCustomers(response.data);
  } 

  async function customerDelete(id: string) {
    try {
      const response = await api.delete('/customer', {
        params: {
          id: id
        }
      });
      if (response.status === 200) {
        const allCustomers = customers.filter((customer) => customer.id !== id);
        setCustomers(allCustomers);
      }
    } catch (error) {
      console.error('Erro: ', error); 
    }
  }

  async function handleDelete(id: string) {
    Swal.fire({
      title: "Tem certeza?",
      text: "Esta ação não poderá ser revertida!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        sucessMessage('Sucesso!', 'Cliente deletado com sucesso!');
        customerDelete(id);
      }
    });
  }

  async function changeStatus(id: string) {
    try {
      const response = await api.post(`/updatesttscustomer?id=${id}`);
      if (response.status === 200) {
        const updatedCustomer = response.data;
        setCustomers(customers.map(customer => 
          customer.id === updatedCustomer.id ? updatedCustomer : customer
        ));
      }
    } catch (error) {
      console.error('Erro: ', error);
    }
  }

  async function handleUpdate(event: FormEvent) {
    event.preventDefault();
    try {
      const response = await api.post(`/updatecustomer?id=${customerID}`, {
        name: nameRef.current?.value,
        email: emailRef.current?.value,
        phone: phoneRef.current?.value,
        address: addressRef.current?.value,
        status: true
      });
      console.log(response.data);
      if (response.status === 200) {
        const updatedCustomer = response.data;
        setCustomers(customers.map(customer => 
          customer.id === updatedCustomer.id ? updatedCustomer : customer
        ));
      }
    } catch (error) {
      console.error('Erro: ', error);
    }
    nameRef.current!.value = "";
    emailRef.current!.value = "";
    phoneRef.current!.value = "";
    addressRef.current!.value = "";
    setEditMode(false);
    setCustomerID('');
    sucessMessage('Sucesso!', 'Cliente atualizado com sucesso!');
  }

  async function handleEdit(id: string) {
    const customer = customers.find((customer) => customer.id === id);
    if (customer && nameRef.current && emailRef.current && phoneRef.current && addressRef.current) {
      nameRef.current.value = customer.name;
      emailRef.current.value = customer.email;
      phoneRef.current.value = customer.phone;
      addressRef.current.value = customer.address;
    }
    scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setEditMode(true);
    setCustomerID(id);
  }


  async function handleSubmit (event: FormEvent){
    event.preventDefault();
    if (!nameRef.current || !emailRef.current || !phoneRef.current || !addressRef.current) {
      return;
    }
    const response = await api.post('/customer', {
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      address: addressRef.current.value,
    });
    console.log(response.data);
    setCustomers(allCustomers => [...allCustomers, response.data]);
    nameRef.current.value = "";
    emailRef.current.value = "";
    phoneRef.current.value = "";
    addressRef.current.value = "";
    sucessMessage('Sucesso!', 'Cliente cadastrado com sucesso!');
  }

  return(
    <div className="w-full min-h-screen dark:bg-gray-800 bg-gray-100 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-center text-5xl font-poppins tracking-wide dark:text-white"> Clientes </h1>
        <form className="flex flex-col my-6 dark:bg-gray-900 bg-gray-200 p-4 rounded shadow-md" onSubmit={ editMode ? handleUpdate : handleSubmit}>
            <label className="font-medium dark:text-white"> Nome: </label>
            <input
            type="text"
            placeholder="Insira seu nome..."
            className="w-full mb-5 p-2 rounded outline-none"
            ref={nameRef}
            required
            />
            <label className="font-medium dark:text-white"> Email: </label>
            <input 
            type="email"
            placeholder="Insira seu email..."
            className="w-full mb-5 p-2 rounded outline-none"
            ref={emailRef}
            required
            />
            <label className="font-medium dark:text-white"> Telefone: </label>
            <input
            type="text"
            placeholder="Insira seu telefone (91234-5678)..."
            className="w-full mb-5 p-2 rounded outline-none"
            ref={phoneRef}
            required
            />
            <label className="font-medium dark:text-white"> CEP: </label>
            <input
            type="text"
            placeholder="Insira seu CEP (12345-666)..."
            className="w-full mb-5 p-2 rounded outline-none"
            ref={addressRef}
            required
            />
            { editMode ? (
              <input 
              id='submit'
              type="submit" 
              value="Atualizar" 
              className="w-full p-2 bg-green-600 font-medium text-white cursor-pointer hover:scale-105 hover:bg-green-500 duration-200 rounded-sm"
              />
              ) : (
              <input 
              id='submit'
              type="submit" 
              value="Cadastrar" 
              className="w-full p-2 bg-blue-600 font-medium text-white cursor-pointer hover:scale-105 hover:bg-blue-500 duration-200 rounded-sm"
              />
              )
            }
        </form>
        <section className="flex flex-col gap-4">
          { customers.map( (customer) => (
              <Customer 
              key={customer.id}
              customer={customer}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              changeStatus={changeStatus}
              />
            )
          )}
        </section>
      </main>
        <DarkMode />  
    </div>
  )
}