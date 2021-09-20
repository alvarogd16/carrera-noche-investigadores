export class Tables {
    constructor() {
        this.activeTable = "0";
    }

    setActiveTable(value) { this.activeTable = value }
    getActiveTable() { return this.activeTable }

    insertTable(track, time) {
        //track es el id de la tabla y pista donde insertar 
        document.getElementById(track).innerHTML = time;
    }

    resetTables() {
        this.resetTable("Table1");
        this.resetTable("Table2");
        this.resetTable("Table3");
        this.resetTable("Table4");
    }
      
    resetTable(tableName) {
        var rows;
        
        rows = document.getElementById(tableName).rows;
          
        for (let i = 1; i < rows.length; i++) {
          rows[i].getElementsByTagName("TD")[1].innerHTML = 99.999;
        }
    }

    sortTable(tableName) {
        var table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementById(tableName);
        switching = true;
      
        while (switching) {
          switching = false;
          // console.log(table.rows);
          rows = table.rows;
          
          /*Busca en todas menos en la 1ra, que es la cabecera.*/
          for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
      
            x = parseFloat(rows[i].getElementsByTagName("TD")[1].innerHTML);
            y = parseFloat(rows[i + 1].getElementsByTagName("TD")[1].innerHTML);
              
            if (x > y) {
              shouldSwitch = true;
              break;
            }
          }
          if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
          }
        }
      }

      selectForFinal() {
        let t1, t2, t3, tmin;
      
        document.getElementById('Table4').rows[1].getElementsByTagName("TD")[0].innerHTML 
          = document.getElementById('Table1').rows[1].getElementsByTagName("TD")[0].innerHTML;
        document.getElementById('Table4').rows[2].getElementsByTagName("TD")[0].innerHTML 
          = document.getElementById('Table2').rows[1].getElementsByTagName("TD")[0].innerHTML;
        document.getElementById('Table4').rows[3].getElementsByTagName("TD")[0].innerHTML 
          = document.getElementById('Table3').rows[1].getElementsByTagName("TD")[0].innerHTML;
      
        t1 = parseFloat(document.getElementById('Table1').rows[2].getElementsByTagName("TD")[1].innerHTML);
        t2 = parseFloat(document.getElementById('Table2').rows[2].getElementsByTagName("TD")[1].innerHTML);
        t3 = parseFloat(document.getElementById('Table3').rows[2].getElementsByTagName("TD")[1].innerHTML);
      
        tmin = Math.min(t1,t2,t3);
      
        if (t1 == tmin) {
            document.getElementById('Table4').rows[4].getElementsByTagName("TD")[0].innerHTML 
              = document.getElementById('Table1').rows[2].getElementsByTagName("TD")[0].innerHTML;
          } else if (t2 == tmin) {
            document.getElementById('Table4').rows[4].getElementsByTagName("TD")[0].innerHTML 
              = document.getElementById('Table2').rows[2].getElementsByTagName("TD")[0].innerHTML;
          }
         else {
          document.getElementById('Table4').rows[4].getElementsByTagName("TD")[0].innerHTML 
            = document.getElementById('Table3').rows[2].getElementsByTagName("TD")[0].innerHTML;
        }
        
      }
      
      fillPodium() {
        document.getElementById('first').innerHTML 
          = document.getElementById('Table4').rows[1].getElementsByTagName("TD")[0].innerHTML;
        document.getElementById('second').innerHTML 
          = document.getElementById('Table4').rows[2].getElementsByTagName("TD")[0].innerHTML;
        document.getElementById('third').innerHTML 
          = document.getElementById('Table4').rows[3].getElementsByTagName("TD")[0].innerHTML;
      }
}