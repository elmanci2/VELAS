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
            AVISO LEGAL flow novelas está de acuerdo con 17 USC § 512 y la
            Digital Millennium Copyright Act (“DMCA”). Es nuestra política
            responder a cualquier notificación de infracción y tomar las
            acciones apropiadas bajo la Digital Millennium Copyright Act
            (“DMCA”) y otras leyes de propiedad intelectual aplicables. 1.Los
            enlaces que figuran en esta página web han sido encontrados en
            páginas de la índole de Youtube, Digiload.co, Mystream.to,
            Uqload.com, Fembed.com, Tu.tv, Openload.co, Bigfile.to,
            Streamcloud.eu, allmyvideos.net, 1fichier.com, streamin.to,
            hugefiles.net, powvideo.net, uptobox.com, flashx.tv, ul.to, hqq.tv,
            mp4upload.com, yourupload.com, nowvideo.sx, etc. Y desconocemos si
            los mismos tienen contratos de cesión de derechos sobre estos videos
            para reproducirlos, alojarlos o permitir su descarga. 2.Todas las
            marcas aquí mencionadas y logos están registrados por sus legítimos
            propietarios y solamente se emplean en referencia a las mismas y con
            un fin de cita o comentario, de acuerdo con el articulo 32 LPI. 3.No
            nos hacemos responsables del uso indebido que puedas hacer del
            contenido de nuestra página. 4.En ningún caso o circunstancia se
            podrá responsabilizar directamente o indirectamente al propietario
            ni a los colaboradores del ilícito uso de la información contenida
            en flow novelas 5.Así mismo tampoco se nos podrá responsabilizar
            directamente o indirectamente de incorrecto uso o mala
            interpretación que se haga de la información y servicios incluidos.
            Igualmente quedara fuera de nuestra responsabilidad el material al
            que usted pueda acceder desde nuestros enlaces. 7.Si decides
            permanecer en nuestro sitio web, quiere decir que has leído,
            comprendido y aceptas las condiciones de esta página. 8.Todo el
            contenido ha sido exclusivamente sacado de sitios públicos de
            Internet, por lo que este material es considerado de libre
            distribución. En ningún artículo legal se menciona la prohibición de
            material libre por lo que esta página no infringe en ningún caso la
            ley. Si alguien tiene alguna duda o problema al respecto, no dude en
            ponerse en contacto con nosotros. 9.Todo la información y programas
            aquí recogidos van destinados al efectivo cumplimiento de los
            derechos recogidos en el artículo 31 RD/1/1996 por el que se aprueba
            el texto refundido de la Ley de la Propiedad Intelectual (LPI) en
            especial referencia al artículo 31.2 LPI, y en concordancia con lo
            expresado en el artículo 100.2 de esta misma ley. 10.Nos reservamos
            el derecho de vetar la entrada a cualquier sujeto a nuestra página
            web y a su vez se reserva el derecho de prohibir el uso de cualquier
            programa y/o información, en concordancia con los derechos de autor
            otorgados por el artículo 14 LPI. 11.La visita o acceso a esta
            página web, que es de carácter privado y no público, exige la
            aceptación del presente aviso. En esta web se podrá acceder a
            contenidos publicados por Youtube, Tu.tv, Openload.co, Bigfile.to,
            Streamcloud.eu, allmyvideos.net, 1fichier.com, streamin.to,
            hugefiles.net, powvideo.net, uptobox.com, flashx.tv, ul.to, hqq.tv,
            mp4upload.com, cuevana3.io, yourupload.com, nowvideo.sx, etc. El
            único material que existe en la web son enlaces ha dicho contenido,
            facilitando únicamente su visionado. Los propietarios de Youtube,
            Digiload.co, Mystream.to, Uqload.com, Tu.tv, Openload.co,
            Bigfile.to, Streamcloud.eu, allmyvideos.net, 1fichier.com,
            streamin.to, hugefiles.net, powvideo.net, uptobox.com, flashx.tv,
            ul.to, hqq.tv, mp4upload.com, yourupload.com, nowvideo.sx, etc. son
            plenamente responsables de los contenidos que publiquen. Por
            consiguiente, flow novelas ni aprueba, ni hace suyos los productos,
            servicios, contenidos, información, datos, opiniones archivos y
            cualquier clase de material existente en Youtube, Digiload.co,
            Mystream.to, Uqload.com, Tu.tv, Openload.co, Bigfile.to,
            Streamcloud.eu, allmyvideos.net, 1fichier.com, streamin.to,
            hugefiles.net, powvideo.net, uptobox.com, cuevana3.io, flashx.tv,
            ul.to, hqq.tv, mp4upload.com, yourupload.com, nowvideo.sx, etc. y no
            controla ni se hace responsable de la calidad, licitud, fiabilidad y
            utilidad de la información, contenidos y servicios existentes en
            Youtube, Tu.tv, Openload.co, Bigfile.to, Streamcloud.eu,
            allmyvideos.net, 1fichier.com, streamin.to, hugefiles.net,
            powvideo.net, uptobox.com, flashx.tv, ul.to, hqq.tv, mp4upload.com,
            yourupload.com, nowvideo.sx, etc.
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
