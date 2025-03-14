import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import { colors } from '../../constants/colors'
import { Header } from '@/components/header'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Select } from '../../components/input/select'
import { useDataStore } from '../../store/data'
import { router } from 'expo-router'

const schema = z.object({
    sexo: z.string().min(1 , { message: "Seu Gênero é obrigatório"}),
    objetivo: z.string().min(1 , { message: "Selecione seu objetivo"}),
    nivel: z.string().min(1 , { message: "Selecione seu Nível"}),
})

type FormData = z.infer<typeof schema>

export default function Create() {

    const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const setPageTwo = useDataStore(state => state.setPageTwo)

    const sexoOptions = [
        {label: "Masculino", value: "masculino"},
        {label: "Feminino", value: "feminino"}
    ]
    const nivelOptions = [
        { label: 'Sedentário (pouco ou nenhuma atividade física)', value: 'Sedentário' },
        { label: 'Levemente ativo (exercícios 1 a 3 vezes na semana)', value: 'Levemente ativo (exercícios 1 a 3 vezes na semana)' },
        { label: 'Moderadamente ativo (exercícios 3 a 5 vezes na semana)', value: 'Moderadamente ativo (exercícios 3 a 5 vezes na semana)' },
        { label: 'Altamente ativo (exercícios 5 a 7 dia por semana)', value: 'Altamente ativo (exercícios 5 a 7 dia por semana)' },
    ]
    
    const objetivoOptions = [
        { label: 'Emagrecer', value: 'emagrecer' },
        { label: 'Hipertrofia', value: 'Hipertrofia' },
        { label: 'Hipertrofia + Definição', value: 'Hipertrofia e Definição' },
        { label: 'Definição', value: 'Definição' },
    ]

    function handleCreate(data: FormData){
        setPageTwo({
            sexo: data.sexo,
            nivel: data.nivel,
            objetivo: data.objetivo
        })

        router.push("/dieta")
    }

    return (
   <View style={styles.container}>
    <Header
        step='Dados Pessoais'
        title='Finalizando Dieta'
        />

    <ScrollView style={styles.content}>
        <Text style={styles.label}>Gênero:</Text>
        <Select
            control={control}
            name="sexo"
            placeholder='Selecione seu Gênero...'
            error={errors.sexo?.message}
            options={sexoOptions}
        />

        <Text style={styles.label}>Nível de atividade Física:</Text>
        <Select
            control={control}
            name="nivel"
            placeholder='Selecione seu nivel de atividade física'
            error={errors.nivel?.message}
            options={nivelOptions}
        />
        <Text style={styles.label}>Objetivo Final:</Text>
        <Select
            control={control}
            name="objetivo"
            placeholder='Selecione seu objetivo final'
            error={errors.objetivo?.message}
            options={objetivoOptions}
        />
        <Pressable style={styles.button} onPress={handleSubmit(handleCreate)}>
            <Text style={styles.buttonText}>AVANÇAR</Text>
        </Pressable>

    </ScrollView>
   </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.blueD
    },
    label:{
        fontSize: 16,
        color: colors.white,
        fontWeight: 'bold',
        marginBottom: 8
    },
    content:{
        paddingLeft: 16,
        paddingRight: 16,
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