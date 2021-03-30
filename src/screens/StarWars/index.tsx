import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  LogBox,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ms } from "react-native-size-matters";
import { QueryClient, useQuery } from "react-query";
import Card from "../../components/StarWars/Card";
import PeopleCard from "../../components/StarWars/PeopleCard";
import Switch from "../../components/StarWars/Switch";

import styles from "./styles";

type Props = {
  children?: ReactNode;
};

export type PeopleResults = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: Date;
  edited: Date;
  url: string;
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

export type PeopleData = {
  next: string | null;
  previous: string | null;
  results: PeopleResults[];
};

const { width } = Dimensions.get("screen");

const fetchData = async (page: number) => {
  const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);

  return res.json();
};

const fetchPeoples = async (page: number) => {
  const res = await fetch(`https://swapi.dev/api/people/?page=${page}`);

  return res.json();
};

function StarWars({ children }: Props) {
  const [page, setPage] = useState(1);
  const [info, setInfo] = useState<"planets" | "peoples">("planets");
  const {
    isLoading: isLoadingPlanets,
    data: queryData,
    error,
    isPreviousData: isPreviousPlanets,
    refetch,
  } = useQuery(["planets", page], () => fetchData(page), {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    enabled: info === "planets",
    onSuccess: () => {
      setInfo("planets");
    },
  });
  const {
    isLoading: isLoadingPeople,
    data: peopleQuery,
    isPreviousData: isPreviousPeoples,
    error: peopleError,
    refetch: peopleRefecth,
  } = useQuery(["peoples", page], () => fetchPeoples(page), {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: info === "peoples",
    onSuccess: () => {
      setInfo("peoples");
    },
  });

  const isPreviousData = isPreviousPlanets || isPreviousPlanets;
  const isLoading = isLoadingPlanets || isLoadingPeople;

  const scrollRef = useRef<FlatList>(null);

  const peopleData: PeopleData = peopleQuery as any;
  const data: Data = queryData as any;

  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  const fecthPeople = useCallback(() => {
    if (peopleData) {
      setPage(1);
      setInfo("peoples");
      return;
    } else if (info === "peoples") {
      return;
    } else {
      setPage(1);

      peopleRefecth();
    }
  }, [info]);

  const fetchPlanets = useCallback(() => {
    if (data) {
      setPage(1);
      setInfo("planets");
      return;
    } else if (info === "planets") {
      return;
    } else {
      setPage(1);

      refetch();
    }
  }, [info]);

  const switchState = useMemo(() => info, [info]);

  const setNextPage = useCallback(() => {
    if (info === "planets") {
      if (!isPreviousPlanets && peopleData.next) {
        scrollRef.current?.scrollToOffset({
          animated: true,
          offset: 0,
        });

        setPage((state) => state + 1);
      }
    } else {
      if (!isPreviousPeoples && data.next) {
        scrollRef.current?.scrollToOffset({
          animated: true,
          offset: 0,
        });

        setPage((state) => state + 1);
      }
    }
  }, [isPreviousData, data, info, isPreviousPeoples, peopleData]);

  const setPreviousPage = useCallback(() => {
    setPage((state) => Math.max(state - 1, 1));
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
  }, [page, info]);

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

  if (peopleError) {
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
        <Switch
          state={switchState}
          a="Planets"
          b="People"
          functionA={() => fetchPlanets()}
          functionB={() => fecthPeople()}
        />
        {info === "planets" ? (
          <FlatList
            ref={scrollRef}
            style={{
              marginTop: ms(10),
            }}
            contentContainerStyle={{
              paddingBottom: ms(20),
            }}
            onRefresh={refetch}
            refreshing={isLoadingPlanets}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => (
              <Text
                style={[
                  styles.btnText,
                  {
                    marginLeft: ms(10),
                    width: width * 0.85,
                    textAlign: "left",
                  },
                ]}
              >
                Current page: {page}
              </Text>
            )}
            data={data.results}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => <Card index={index} item={item} />}
          />
        ) : (
          <FlatList
            ref={scrollRef}
            style={{
              marginTop: ms(10),
            }}
            contentContainerStyle={{
              paddingBottom: ms(20),
            }}
            onRefresh={peopleRefecth}
            refreshing={isLoadingPeople}
            showsVerticalScrollIndicator={false}
            data={peopleData.results}
            ListHeaderComponent={() => (
              <Text
                style={[
                  styles.btnText,
                  {
                    marginLeft: ms(10),
                    width: width * 0.85,
                    textAlign: "left",
                  },
                ]}
              >
                Current page: {page}
              </Text>
            )}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <PeopleCard index={index} item={item} />
            )}
          />
        )}
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
