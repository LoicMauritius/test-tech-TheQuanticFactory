"use client"

import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import React, { useEffect } from 'react'
import { Fontaine } from "@/types/types"

export default function Map({ fontaines }: { fontaines: Fontaine[] }) {

    // Coordonnées de Paris
    const parisCoords: [number, number] = [48.8566, 2.3522];

    return (
        <MapContainer center={parisCoords} zoom={12} style={{ height: '700px', width: '100%' }} >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {fontaines
                .filter(f => f.latitude !== null && f.longitude !== null)
                .map(f => (
                    <CircleMarker key={f.id} center={[f.latitude!, f.longitude!]} radius={5} color="blue" >
                        <Popup>
                            <strong>{f.modele ?? "Fontaine"}</strong><br />
                            {f.voie && `${f.voie}, `}{f.commune}
                            <br />
                            {f.dispo ? `Disponibilité : ${f.dispo}` : ""}
                        </Popup>
                    </CircleMarker>
                ))
            }
        </MapContainer>
    );
}
