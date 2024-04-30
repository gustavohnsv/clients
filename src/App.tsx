import { useEffect, useState, useRef, FormEvent } from 'react';
import { api } from './services/api';
import Customer from './components/Customer';

interface CustomerProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: boolean;
}

export default function App() {

  const [customers, setCustomers] = useState<CustomerProps[]>([]);
  const nameRef = useRef<HTMLInputElement | null >(null);
  const emailRef = useRef<HTMLInputElement | null >(null);
  const phoneRef = useRef<HTMLInputElement | null >(null);
  const addressRef = useRef<HTMLInputElement | null >(null);

  useEffect(() => {
    loadCustomers();
  }, [])

  async function loadCustomers() {
    const response = await api.get('/customer');
    console.log(response.data);
    setCustomers(response.data);
  } 

  async function handleDelete(id: string) {
    try {
      await api.delete('/customer', {
        params: {
          id: id
        }
      });

      const allCustomers = customers.filter((customer) => customer.id !== id);
      setCustomers(allCustomers);
    } catch (error) {
      console.error('Erro: ', error); 
    }
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
  }

  return(
    <div className="w-full min-h-screen bg-gray-800 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-center text-4xl font-sans text-white"> Clientes </h1>
        <form className="flex flex-col my-6 bg-gray-900 p-4 rounded shadow-md" onSubmit={handleSubmit}>
            <label className="font-medium text-white"> Nome: </label>
            <input
            type="text"
            placeholder="Homem de Ferro"
            className="w-full mb-5 p-2 rounded outline-none"
            ref={nameRef}
            required
            />
            <label className="font-medium text-white"> Email: </label>
            <input 
            type="email"
            placeholder="tonystark@protonmail.com"
            className="w-full mb-5 p-2 rounded outline-none"
            ref={emailRef}
            required
            />
            <label className="font-medium text-white"> Telefone: </label>
            <input
            type="text"
            placeholder="93322-1100"
            className="w-full mb-5 p-2 rounded outline-none"
            ref={phoneRef}
            required
            />
            <label className="font-medium text-white"> CEP: </label>
            <input
            type="text"
            placeholder="09876-100"
            className="w-full mb-5 p-2 rounded outline-none"
            ref={addressRef}
            required
            />
            <input 
            type="submit" 
            value="Cadastrar" 
            className="w-full p-2 bg-blue-600 font-medium text-white cursor-pointer hover:scale-105 hover:bg-blue-500 duration-200 rounded-sm"
            />
        </form>
        <section className="flex flex-col gap-4">
          { customers.map( (customer) => (
              <Customer 
              key={customer.id}
              customer={customer}
              handleDelete={handleDelete}
              />
            )
          )}
        </section>
      </main>
    </div>
  )
}