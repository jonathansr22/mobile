import { View, Text, StyleSheet, Pressable, ScrollView, Share } from 'react-native'
import { useDataStore } from '../../store/data'
import { api } from '../../services/api'
import { useQuery } from '@tanstack/react-query'
import { colors } from '@/constants/colors'
import { Data } from '@/types/data'
import { Link, router } from 'expo-router'
import { Ionicons, Feather } from '@expo/vector-icons'

interface ResponseData{
    data: Data
}

export default function Dieta() {
    const user = useDataStore(state => state.user)

    const { data, isFetching, error } = useQuery({
        queryKey: ["dieta"],
        queryFn: async () => {
            try{
                if(!user){
                    throw new Error("Falha ao gerar Dieta")
                }

                const response = await api.post<ResponseData>("/create", {
                    nome: user.nome,
                    peso: user.peso,
                    altura: user.altura,
                    idade: user.idade,
                    sexo: user.sexo,
                    objetivo: user.objetivo,
                    nivel: user.nivel
                })

                return response.data.data

            }catch(err){
                console.log(err);
            }
        }
    })

   async function handleShare(){
    try{
        if(data && Object.keys(data).length === 0) return;

        const suplementos = `${data?.suplementos.map( item => `${item}`)}`

        const dieta = `${data?.refeicoes.map( item => `\n- Nome: ${item.nome}\n- Horário: 
        ${item.horario}\n- Alimentos: ${item.alimentos.map( alimento => ` ${alimento}` )}`)}`

        const mensagem = `Dieta: ${data?.nome} - Objetivo: ${data?.objetivo}\n\n${dieta}\n\n- Dica de Suplementos: ${suplementos}`

        await Share.share({
            message: mensagem
        })
    }catch(err){
        console.log(err);
    }
   }

    if(isFetching){
        return(
            <View style={styles.loading}>
                <Text style={styles.loadingText}>Estamos gerando sua Dieta!</Text>
                <Text style={styles.loadingText}>Consultando IA...</Text>
            </View>
        )
    }

    if(error){
        return(
            <View style={styles.loading}>
                <Text style={styles.loadingText}>Falha ao gerar sua Dieta!</Text>
                <Link href="/step">
                    <Text style={styles.loadingText}>Tente novamente...</Text>
                </Link>
            </View>
        )
    }

    return (
   <View style={styles.container}>
        <View style={styles.containerHeader}>
            <View style={styles.contentHeader}>
                <Text style={styles.title}>Minha Dieta</Text>
                    <Pressable style={styles.buttonShare} onPress={handleShare}>
                        <Text style={styles.buttonShareText}>Compartilhar</Text>
                    </Pressable>
            </View>
        </View>
        
        <View style={{ paddingLeft: 16, paddingRight: 16, flex: 1 }}>
        {data && Object.keys(data).length > 0 && (
            <>
                <Text style={styles.nome}>{data.nome}</Text>
                <Text style={styles.nome}>Objetivo: {data.objetivo}</Text>
                
                <Text style={styles.label}>Refeições:</Text>
                <ScrollView>
                    <View style={styles.foods}>
                        {data.refeicoes.map( (refeicao) => (
                            <View key={refeicao.nome} style={styles.food}>
                                <View style={styles.foodHeader}>
                                    <Text style={styles.foodName}>{refeicao.nome}</Text>
                                    <Ionicons name="restaurant" size={14} color={colors.blueB}/>
                                </View>

                                <View style={styles.foodContent}>
                                    <Feather name='clock' size={14} color={colors.blueB}/>
                                    <Text>Horario: {refeicao.horario}</Text>
                                </View>

                                <Text style={styles.foodText}>Alimentos:</Text>
                                {refeicao.alimentos.map(alimento => (
                                    <Text key={alimento}>{alimento}</Text>
                                ))}

                            </View>
                        ))}
                    </View>

                    <View style={styles.suplementos}>
                        <Text style={styles.foodName}>Dica De Suplementos:</Text>
                        {data.suplementos.map( item => (
                            <Text key={item}>{item}</Text>
                        ))}
                    </View>

                    <Pressable style={styles.button} onPress={ () => router.replace("/")}>
                        <Text style={styles.buttonText}>
                            Gerar nova dieta
                        </Text>
                    </Pressable>
                </ScrollView>
            </>
        )}
        </View>

    </View>

  );
}

const styles = StyleSheet.create({
    loading:{
        flex:1,
        backgroundColor: colors.blueD,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingText:{
        fontSize: 18,
        color: colors.background,
        marginBottom: 4,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold'
    },
    container:{
        backgroundColor: colors.blueD,
        flex:1,
    },
    containerHeader:{
        backgroundColor: colors.background,
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
        paddingTop: 60,
        paddingBottom: 20,
        marginBottom: 16
    },
    contentHeader:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 16
    },
    title:{
        fontSize: 28,
        color: colors.blueD,
        fontWeight: 'bold'
    },
    buttonShare:{
        backgroundColor: colors.blueB,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        borderRadius: 4
    },
    buttonShareText:{
        color: colors.background,
        fontWeight: '500'
    },
    nome:{
        fontSize: 18,
        color: colors.background,
        fontWeight: 'bold'
    },
    label:{
        color: colors.background,
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 25
    },
    foods:{
        backgroundColor: colors.background,
        padding: 14,
        borderRadius: 8,
        marginTop: 8,
        gap: 8
    },
    food:{
        backgroundColor: 'rgba(208, 208, 208, 0.40)',
        padding: 8,
        borderRadius: 5
    },
    foodHeader:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    foodName:{
        color: colors.blueD,
        fontSize: 16,
        fontWeight: 'bold'
    },
    foodContent:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    foodText:{
        color: colors.blueD,
        fontSize: 16,
        marginBottom: 4,
        marginTop: 14,
        fontWeight: "500"
    },
    suplementos:{
        backgroundColor: colors.background,
        marginTop: 14,
        marginBottom: 14,
        padding: 14,
        borderRadius: 8
    },
    button:{
        backgroundColor: colors.blueB,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 25
    },
    buttonText:{
        color: colors.background,
        fontSize: 16,
        fontWeight: 'bold'
    }
})