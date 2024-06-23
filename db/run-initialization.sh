# Wait to be sure that SQL Server came up
sleep 5s

# Run the setup script to create the DB and the schema in the DB
# Note: make sure that your password matches what is in the Dockerfile
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P password123! -d master -i ddl.sql
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P password123! -d DbQuanAo -i dml_trigger.sql
/opt/mssql-tools/bin/sqlcmd -b -S localhost -U sa -P password123! -d DbQuanAo -i DuLieuDoAn.sql