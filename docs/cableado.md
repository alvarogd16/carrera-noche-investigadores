# Cableado del proyecto

La parte electrónica se compone de una **Raspberry Pi**, un **servo-motor** y cuatro **sensores finales de carrera**.

Las conexiones son las siguientes:

## Servo

| Cable | Color   | Pin    |
|-------|---------|--------|
| GND   | Marrón  | GND    |
| VCC   | Rojo    | +6V    |
| PWM   | Naranja | GPIO17 |

## Sensores finales de carrera

| Sensor | Color cable | Pin    |
|--------|-------------|--------|
| 1      | Verde       | GPIO26 |
| 2      | Amarillo    | GPIO19 |
| 3      | Naranja     | GPIO13 |
| 4      | Rojo        | GPIO6  |
| GND    | Marrón      | GND    |

## Raspberry Pi

Se puede ver el pinout de cualquier Raspberry Pi en [esta](https://pinout.xyz/) página.

Para facilitar la conxión, se han soldado los cables y solo es necesario poner el conector en la Raspberry.

⚠️ **CUIDADO**: Es importante tener en cuenta la orientación de la misma. El conector tiene una indicación con la orientación correcta.