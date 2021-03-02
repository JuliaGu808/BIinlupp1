import React from 'react'

function Home(){
    return (
        <div className="text-start container my-3" >
        <h3>Skicka meddelanden</h3>
I denna inlämningsuppgift ska du skapa ett antal olika iot-enheter som ska skicka in data till din Azure IOT Hub. 
Du bestämmer själv vad för typ av data som dessa iot-enheter ska skicka. Det kan vara allt från temperatur och 
luftfuktighet från en DHT-sensor till distanssensor som mäter avstånd etc. Allt är lite beroende på hur 
mycket utrustning du har. Dock ska meddelanden som skickas in i din Azure IOT Hub endast vara meddelanden som 
har ett annat värde än det som var tidigare. Exempelvis temperaturen ändras med +-1 grad. 
Annars ska inget meddelande skickas iväg.
<strong>Det som ska vara gemensamt för samtliga meddelande är följande information:</strong>
<ul>
    <li>Enhetens unika id</li>
    <li>Tidsangivelse då meddelandet skapas</li>
</ul>
<strong>Du ska även kunna skicka information genom Json-properties såsom:</strong>
<ul>
    <li>Skolan namn</li>
    <li>Ditt namn</li>
</ul>
För godkänt räcker det med att du kan skicka information från en iot-enhet och då måste denna iot-enhet vara 
en MCU. För väl godkänt krävs det att du skickar data från minst två olika iot-enheter. Dessa iot-enheter måste
 då skicka olika typer av sensor-data.
<h3>Lagring av meddelanden</h3>
Alla meddelanden som skickas ska kunna sparas i någon form av lagringslösning.
 Du får själv välja vilken typ av lagringslösning du vill lagra i. Alternativen du har att välja 
 mellan är följande:
<ul>
    <li>Table Storage (NoSql)n</li>
    <li>Cosmos DB (NoSql)</li>
    <li>SQL Database (SQL)</li>
</ul>
För godkänt räcker det med att du kan lagra data i en av ovanstående lagringslösningar. 
För väl godkänt krävs det att du lagrar data i minst två olika lagringslösningar. 
</div>
    )
}

export default Home