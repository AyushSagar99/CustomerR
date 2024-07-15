import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CustomerForm() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('');
  const [userId, setUserId] = useState('');
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userID');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleCategoryClick = (category) => {
    setCategory(category);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting form data:', { name, message, category, userId });
      const response = await axios.post('http://localhost:5000/api/submitForm', { name, message, category, userId });
      console.log('Response from server:', response.data);

      // Reset form fields after successful submission
      setName('');
      setMessage('');
      setCategory('');
    } catch (error) {
      console.error('There was an error submitting the form!', error);
    }
  };

  const handleCheckStatus = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/userSubmissions/${userId}`);
      console.log('User submissions:', response.data);
      setSubmissions(response.data);
    } catch (error) {
      console.error('Error fetching user submissions:', error);
    }
  };

  return (
    <>
      <div className='mt-8'>
        <p className='text-2xl p-2'>Customer Care</p>
        <p className='flex flex-col ml-2 text-slate-500'>
          Have a compliment or complaint, or want to let us know about a recent experience? 
          Fill out the information below to <span>start a request with our Customer Care team.</span>
        </p>
        <div className='flex flex-col justify-center items-center mt-8'>
          <Tabs defaultValue="submitForm" className="w-[70rem]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="submitForm">Submit Form</TabsTrigger>
              <TabsTrigger value="checkStatus">Check Status</TabsTrigger>
            </TabsList>
            <TabsContent value="submitForm">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Request</CardTitle>
                  <CardDescription>Please state your request</CardDescription>
                </CardHeader>
                <div className='gap-3 flex justify-center items-center'>
                  <button
                    type='button'
                    onClick={() => handleCategoryClick('General Queries')}
                    className={`w-36 h-20 rounded-lg border-2 bg-stone-100 hover:border-blue-400 hover:border-2 focus:border-4 ${category === 'General Queries' ? 'border-black' : ''}`}
                  >
                    General Queries
                  </button>
                  <button
                    type='button'
                    onClick={() => handleCategoryClick('Product Features Queries')}
                    className={`w-36 h-20 rounded-lg border-2 bg-stone-100 hover:border-blue-400 hover:border-2 focus:border-4 ${category === 'Product Features Queries' ? 'border-black' : ''}`}
                  >
                    Product Features Queries
                  </button>
                  <button
                    type='button'
                    onClick={() => handleCategoryClick('Product Pricing Queries')}
                    className={`w-36 h-20 rounded-lg border-2 bg-stone-100 hover:border-blue-400 hover:border-2 focus:border-4 ${category === 'Product Pricing Queries' ? 'border-black' : ''}`}
                  >
                    Product Pricing Queries
                  </button>
                  <button
                    type='button'
                    onClick={() => handleCategoryClick('Product Feature Implementation Requests')}
                    className={`w-36 h-20 rounded-lg border-2 bg-stone-100 hover:border-blue-400 hover:border-2 focus:border-4 ${category === 'Product Feature Implementation Requests' ? 'border-black' : ''}`}
                  >
                    Product Feature Implementation Requests
                  </button>
                </div>
                <CardContent className="space-y-2">
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-1">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="space-y-1 flex flex-col">
                      <Label htmlFor="message">Please give a brief of the problem you are facing</Label>
                      <textarea
                        id="message"
                        className=' flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 
                          text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
                          disabled:opacity-50 focus-within:outline-none'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      ></textarea>
                    </div>
                    <CardFooter>
                      <Button type="submit">Submit</Button>
                    </CardFooter>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="checkStatus">
              <Card>
                <CardHeader>
                  <CardTitle>Check Status</CardTitle>
                  <CardDescription>Enter your user ID to check the status of your requests</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="userId">User ID</Label>
                    <Input id="userId" type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleCheckStatus}>Check Status</Button>
                </CardFooter>
                {submissions.length > 0 && (
                  <CardContent>
                    <h3 className='text-xl mt-4'>Submissions</h3>
                    <ul>
                      {submissions.map((submission, index) => (
                        <li key={index} className='border border-black p-2 my-2 rounded-lg'>
                          <p><strong>Category:</strong> {submission.category}</p>
                          <p><strong>Message:</strong> {submission.message}</p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
