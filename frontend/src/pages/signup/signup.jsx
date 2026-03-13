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
import { SignupSchema } from "@/schema/signup.schema.js";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useSignup } from "@/hooks/useSignup.hook.js";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster.jsx";
import { useToast } from "@/hooks/use-toast.js";


function LoginRedirect(){
    return (
        <Button variant="secondary" asChild>
            <Link to="/" >Login here</Link>
        </Button>
    );
}

export default function Signup(){

    const {mutate, isPending, isError, isSuccess} = useSignup();
    const {toast} = useToast();

    const form = useForm({
        resolver: zodResolver(SignupSchema),
        // mode: "onChange",
    });

    function onSubmit(values){
        mutate(values);
        form.reset(); // to remove all the values used to signup
    };

    useEffect(()=>{
        if(isSuccess){
            toast({
                title: "User Created Successfully",
                description: "You can now login and start creating task",
                action: <LoginRedirect/>, // redirect to the function
            })
        }
    }, [isSuccess]); // array here, the variables which when changes its value, triggers the function

    useEffect(()=>{
        if(isError){
            toast({
                title: "Your request failed",
                description: "Possibly the user already exists",
                variant: "destructive",
            });
        }
    }, [isError]); 

    
    return (
        <section className="flex flex-row w-full max-w-screen-xl min-h-screen justify-center items-center">
            <div className="w-4/12">
                <Card>
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>Create a new account to start creating task</CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent>
                            <FormField
                                control = {form.control}
                                name="firstName"
                                render = {({field, fieldState})=>(
                                    <FormItem className="mb-4" >
                                        <FormControl>
                                            <Input type="text" placeholder="First Name" {...field} value={field.value ?? ""}/>
                                        </FormControl>
                                        {fieldState.error && <p style={{color: 'red'}}>{fieldState.error.message}</p>}
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control = {form.control}
                                name="lastName"
                                render = {({field})=>(
                                    <FormItem className="mb-4" >
                                        <FormControl>
                                            <Input type="text" placeholder="Last Name" {...field} value={field.value ?? ""}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

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
                            <p className="basis-1/2">Already have an account? {" "} <Link to="/" className="hover:text-blue-500">Login here</Link> 
                            </p>
                            <Button type="submit">Sign Up</Button>
                        </CardFooter>
                    </form>
                </Form>
                </Card>
            </div>
            <Toaster/>
        </section>
    );
}