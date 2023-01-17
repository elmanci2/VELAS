import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { DARCK__COLOR__TEME, LING__COLOR__TEME } from "../../Constants/Colors";
import { openConditios } from "../../zustand/state/myStorage";

// create a component
export const TerminosAncoditionesHome = () => {
  const { saveAsectConditions } = openConditios();
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.conted}>
        <Text style={styles.title}> Terminos y condiciones </Text>

        <ScrollView style={styles.scrollView}>
          <Text style={styles.info}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum,
            expedita! Est quasi inventore eum dicta blanditiis, corporis natus
            earum optio vel esse aliquam. Provident explicabo nihil ducimus
            ullam nesciunt officiis molestiae quia, perferendis ea eveniet
            nostrum voluptas dicta autem blanditiis voluptatum sint? Eos
            consectetur aliquam fugiat error dolorum quia, cum illo quas vero?
            Sunt quibusdam commodi adipisci consequuntur possimus est officiis
            reprehenderit omnis quasi hic, exercitationem sint repellat quam,
            doloremque inventore odio! Obcaecati dolore neque corrupti debitis!
            Illum quisquam, reprehenderit pariatur suscipit assumenda minus nam
            repellendus aspernatur fugiat atque. Tempora, iusto inventore. Illo
            dolore libero vel numquam aliquam ea recusandae sint natus, magni
            labore mollitia facilis dicta iste autem esse eligendi ducimus culpa
            odit, ipsam, porro error fuga vitae veniam maiores. Aspernatur
            deleniti tempore non tenetur! Nihil sequi commodi ipsam veniam rem
            quasi dolorem nesciunt itaque ab fuga doloribus impedit illo
            aspernatur enim debitis excepturi esse consequuntur hic, repellat ex
            molestiae! Qui facere sequi perferendis modi, dolorum reprehenderit,
            mollitia repellendus animi deserunt neque eum quae quibusdam. Fugit
            voluptatem enim eveniet perspiciatis dicta aut totam? Esse, fugit.
            Debitis, ex quidem culpa fugit mollitia delectus quisquam ducimus
            minus dolor repudiandae? Reprehenderit laborum voluptas obcaecati
            perspiciatis accusantium molestiae voluptate expedita. Asperiores,
            numquam aliquid excepturi cupiditate neque odit veritatis quaerat
            aut quis ut adipisci aperiam magni incidunt vel omnis sequi ab modi
            ipsam id atque. Nisi rem cumque tempore. Eum sit accusamus
            consectetur laudantium labore, unde magni commodi dicta sed, tenetur
            nulla asperiores beatae sapiente vel mollitia esse quo autem enim
            corrupti blanditiis quod soluta consequuntur! Sit nisi iusto ratione
            quasi nesciunt in dolore porro, optio reprehenderit exercitationem,
            recusandae magni consequuntur placeat, quidem obcaecati reiciendis
            minima mollitia vel omnis vero necessitatibus? Placeat fuga voluptas
            aut architecto minima reprehenderit cupiditate aliquid culpa
            incidunt officiis voluptates deleniti vitae esse repudiandae ipsam,
            quos obcaecati nobis a. Earum neque odit, repellendus harum quis
            iure ratione totam libero laudantium nam animi officia ad
            voluptatibus voluptatem quae quaerat, modi doloribus? Praesentium
            quos suscipit ea, error beatae officia ipsam expedita dicta. Illum
            quis, nobis minus rem ratione at ea quaerat error repudiandae
            accusantium ipsam quidem, iure natus nam! Totam, deserunt inventore?
            A ab quaerat corporis expedita cum perspiciatis ducimus
            reprehenderit? Esse perferendis a in voluptate porro molestiae
            atque. Aperiam dolores cumque quod odio voluptate a laborum atque
            sint ullam! Totam minima voluptatibus dicta voluptatem dolores
            delectus architecto? Explicabo odio ex aut tempore quam architecto
            vel hic unde. Ab nesciunt aliquid nemo error molestias rem
            perferendis maiores iste porro numquam? Vitae maiores explicabo
            laudantium? Odio iure quos quidem aut corporis adipisci doloremque
            corrupti vel necessitatibus similique perspiciatis, est vitae
            repellat! Quasi fugit eveniet asperiores odit dignissimos? Sint
            reprehenderit quasi laborum similique. Deleniti dicta, et debitis
            assumenda perferendis magni minima, praesentium aperiam libero
            facere illo harum excepturi, temporibus numquam odio saepe officiis
            vero? Eveniet maiores sint, nobis corporis nulla et totam? Itaque
            magni nobis sunt nihil suscipit commodi nostrum impedit recusandae
            doloremque facilis, eaque porro adipisci quia quos vel voluptas
            temporibus cumque corrupti fugiat! Distinctio nemo vitae atque ut
            quo a accusantium beatae.{" "}
          </Text>
        </ScrollView>

        <TouchableOpacity onPress={() => saveAsectConditions()}>
          <Text style={[styles.botom, {}]}>Aceptar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    elevation: 2,
    borderRadius: 7,
    width: "100%",
    height: "100%",
    zIndex: 10,
  },

  title: {
    fontWeight: "700",
    fontSize: 20,
    paddingBottom: 10,
  },

  info: {
    fontWeight: "300",
    fontSize: 17,
  },

  botom: {
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: DARCK__COLOR__TEME.SECONST,
    color: "white",
    marginVertical: 20,
    fontSize: 17,
  },

  conted: {
    paddingHorizontal: 20,
    paddingVertical: 50,
    alignItems: "center",
    backgroundColor: LING__COLOR__TEME.PRIMARI,
    borderRadius: 9,
    height: "100%",
  },

  scrollView: {
    height: "80%",
  },
});
