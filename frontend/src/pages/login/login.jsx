import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button.jsx";
import { Link } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { LoginSchema } from "@/schema/login.schema.js";
import { useEffect, useState } from "react";
import { useLogin } from "@/hooks/useLogin.hook.js";
import { useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster.jsx";
import { useToast } from "@/hooks/use-toast.js";

export default function Login(){

    const {mutate, isSuccess, isError} = useLogin();
    const[login, setLogin] = useState(false);
    const navigate = useNavigate();
    const {toast} = useToast();

    function onSubmit(values){
        mutate(values);
        form.reset();
    }

    const form = useForm({
        resolver: zodResolver(LoginSchema),
    });

    useEffect(()=>{
        if(isSuccess){
            setLogin(true);
        }
    }, [isSuccess]);

    useEffect(()=>{
        if(login){
            navigate("/tasks");
        }
    }, [login]);

    useEffect(()=>{
        if(isError){
            toast({
                title: "Your request failed",
                description: "Check your login crendentials",
                variant: "destructive",
            });
        }
    }, [isError]);

    return (
        <section className="flex flex-row w-full max-w-screen-xl min-h-screen justify-center items-center">
            <div className="w-4/12">
                <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Login and create task</CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent>
                            <FormField
                                control = {form.control}
                                name="email"
                                render = {({field, fieldState})=>(
                                    <FormItem className="mb-4" >
                                        <FormControl>
                                            <Input type="email" placeholder="Email" {...field} value={field.value ?? ""}/>
                                        </FormControl>
                                        {fieldState.error && <p style={{color: 'red'}}>{fieldState.error.message}</p>}
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control = {form.control}
                                name="password"
                                render = {({field, fieldState})=>(
                                    <FormItem className="mb-4" >
                                        <FormControl>
                                            <Input type="password" placeholder="Password" {...field} value={field.value ?? ""}/>
                                        </FormControl>
                                        {fieldState.error && <p style={{color: 'red'}}>{fieldState.error.message}</p>}
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter className="flex flex-row justify-between">
                            <p className="basis-1/2">Dont have an account? {" "} <Link to="/signup" className="hover:text-blue-500">SignUp here</Link> 
                            </p>
                            <Button type="submit">Login</Button>
                        </CardFooter>
                    </form>
                </Form>
                </Card>
            </div>
            <Toaster/>
        </section>
    );
}  