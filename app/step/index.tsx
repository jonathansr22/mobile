import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import { colors } from '../../constants/colors'
import { Header } from '../../components/header'
import { Input } from '../../components/input'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { router } from 'expo-router'
import { useDataStore } from '../../store/data'

const schema = z.object({
    nome: z.string().min(1 , { message: "O nome é obrigatório"}),
    idade: z.string().min(1 , { message: "A idade é obrigatória"}),
    peso: z.string().min(1 , { message: "O peso é obrigatório"}),
    altura: z.string().min(1 , { message: "A altura é obrigatória"}),
})

type FormData = z.infer<typeof schema>

export default function Step(){

    const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const setPageOne = useDataStore(state => state.setPageOne)

    function handleCreate(data: FormData){
        console.log("PASSANDO DADOS DA PAGINA 1");
        setPageOne({
            nome: data.nome,
            idade: data.idade,
            peso: data.peso,
            altura: data.altura
        })

        router.push("/create")
    }

    return(
        <View style={styles.container}>
            <Header
                step='Dados Pessoais'
                title='Vamos Começar!'
            />

            <ScrollView style={styles.content}>
                <Text style={styles.label}> Nome:</Text>
                <Input
                    name="nome"
                    control={control}
                    placeholder="Digite seu nome..."
                    error={errors.nome?.message}
                    keyboardType="default"
                />

                <Text style={styles.label}> Idade:</Text>
                <Input
                    name="idade"
                    control={control}
                    placeholder="Digite sua idade..."
                    error={errors.idade?.message}
                    keyboardType="numeric"
                />
                <Text style={styles.label}> Altura:</Text>
                <Input
                    name="altura"
                    control={control}
                    placeholder="Digite sua altura..."
                    error={errors.altura?.message}
                    keyboardType="numeric"
                />
                <Text style={styles.label}> Peso:</Text>
                <Input
                    name="peso"
                    control={control}
                    placeholder="Digite seu peso..."
                    error={errors.peso?.message}
                    keyboardType="numeric"
                />

                <Pressable style={styles.button} onPress={handleSubmit(handleCreate)}>
                    <Text style={styles.buttonText}>AVANÇAR</Text>
                </Pressable>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.blueD
    },
    content:{
        paddingLeft: 16,
        paddingRight: 16,
    },
    label:{
        fontSize: 16,
        color: colors.white,
        fontWeight: 'bold',
        marginBottom: 8
    },
    button:{
       backgroundColor: colors.blueB,
       height: 44,
       justifyContent: 'center',
       alignItems: 'center',
       borderRadius: 4 
    },
    buttonText:{
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold'
    }
})