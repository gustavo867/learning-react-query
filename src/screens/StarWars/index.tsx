import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ActivityIndicator,
  FlatList,
  LogBox,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ms } from "react-native-size-matters";
import { useQuery } from "react-query";
import Card from "../../components/StarWars/Card";

import styles from "./styles";

type Props = {
  children?: ReactNode;
};

export type Results = {
  climate: string;
  created: Date;
  diameter: string;
  edited: Date;
  films: string[];
  gravity: string;
  name: string;
  orbital_period: string;
  population: string;
  residents: string[];
  rotation_period: string;
  surface_water: string;
  terrain: string;
  url: string;
};

export type Data = {
  next: string | null;
  previous: string | null;
  results: Results[];
};

const fetchData = async (page: number) => {
  const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);

  return res.json();
};

function StarWars({ children }: Props) {
  const [page, setPage] = useState(1);
  const {
    isLoading,
    data: queryData,
    error,
    isPreviousData,
    refetch,
  } = useQuery(["planets", page], () => fetchData(page), {
    keepPreviousData: true,
  });

  const scrollRef = useRef<FlatList>(null);

  const data: Data = queryData as any;

  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  const setNextPage = useCallback(() => {
    if (!isPreviousData && data.next) {
      scrollRef.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
      setPage((state) => state + 1);
    }
  }, [isPreviousData, data]);

  const setPreviousPage = useCallback(() => {
    setPage((state) => Math.max(state - 1, 1));
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
  }, [page]);

  if (isLoading) {
    return (
      <View
        style={[
          styles.container,
          { alignItems: "center", justifyContent: "center", paddingTop: 0 },
        ]}
      >
        <Text
          style={[
            styles.title,
            {
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
              marginTop: ms(15),
              fontSize: ms(40),
            },
          ]}
        >
          Loading
        </Text>
        <ActivityIndicator size="large" color="gold" />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[
          styles.container,
          { alignItems: "center", justifyContent: "center", paddingTop: 0 },
        ]}
      >
        <Text style={styles.error}>Unexpected error</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>StarWars Info Planets</Text>
        <FlatList
          ref={scrollRef}
          style={{
            marginTop: ms(10),
          }}
          contentContainerStyle={{
            paddingBottom: ms(20),
          }}
          onRefresh={refetch}
          refreshing={isLoading}
          showsVerticalScrollIndicator={false}
          data={data.results}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Card item={item} />}
        />
        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={() => setPreviousPage()}
            activeOpacity={0.8}
            style={[
              styles.btn,
              {
                backgroundColor:
                  page === 1 ? "rgba(28, 26, 28, 0.6)" : "#1C1A1C",
              },
            ]}
            disabled={page === 1}
          >
            <Text style={styles.btnText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setNextPage()}
            activeOpacity={0.8}
            style={[
              styles.btn,
              {
                backgroundColor: !data.next
                  ? "rgba(28, 26, 28, 0.6)"
                  : "#1C1A1C",
              },
            ]}
            disabled={!data.next}
          >
            <Text style={styles.btnText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default StarWars;
